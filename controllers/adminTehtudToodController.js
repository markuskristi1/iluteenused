

const supabase = require("../config/supabase");

const BUCKET_NAME = "gallery";

function extractStoragePathFromPublicUrl(publicUrl) {
    if (!publicUrl) return null;

    const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;
    const index = publicUrl.indexOf(marker);

    if (index === -1) return null;

    return publicUrl.substring(index + marker.length);
}

exports.getTehtudtood = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("gallery_images")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) {
            return res.status(500).send("Galerii laadimine ebaõnnestus.");
        }

        const safeData = data || [];

        const kuuned = safeData
            .filter(item => item.category === "kuuned")
            .map(item => item.image_url);

        const juuksed = safeData
            .filter(item => item.category === "juuksed")
            .map(item => item.image_url);

        res.render("admin/tehtudtood", {
            kuuned,
            juuksed,
            success: req.query.success || "",
            error: ""
        });
    } catch (error) {
        console.error("Admin gallery load error:", error);
        return res.status(500).send("Serveri viga galerii laadimisel.");
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const { category } = req.body;

        if (!req.file) {
            return res.status(400).render("admin/tehtudtood", {
                kuuned: [],
                juuksed: [],
                success: "",
                error: "Palun vali pilt."
            });
        }

        if (!["kuuned", "juuksed"].includes(category)) {
            return res.status(400).render("admin/tehtudtood", {
                kuuned: [],
                juuksed: [],
                success: "",
                error: "Vale kategooria."
            });
        }

        const fileExt = req.file.originalname.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
        const storagePath = `${category}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(storagePath, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false
            });

        if (uploadError) {
            console.error("Storage upload error:", uploadError);
            return res.status(500).send("Pildi üleslaadimine Storage'isse ebaõnnestus.");
        }

        const {
            data: { publicUrl }
        } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(storagePath);

        const { error: insertError } = await supabase
            .from("gallery_images")
            .insert([
                {
                    category,
                    image_url: publicUrl,
                    sort_order: 1
                }
            ]);

        if (insertError) {
            console.error("DB insert error:", insertError);

            // rollback: kustuta Storage fail, kui DB insert ebaõnnestub
            await supabase.storage.from(BUCKET_NAME).remove([storagePath]);

            return res.status(500).send("Pildi salvestamine andmebaasi ebaõnnestus.");
        }

        return res.redirect("/admin/tehtudtood?success=1");
    } catch (error) {
        console.error("Admin upload error:", error);
        return res.status(500).send("Pildi lisamisel tekkis viga.");
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { imagePath } = req.body;

        if (!imagePath) {
            return res.redirect("/admin/tehtudtood");
        }

        const storagePath = extractStoragePathFromPublicUrl(imagePath);

        const { error: dbDeleteError } = await supabase
            .from("gallery_images")
            .delete()
            .eq("image_url", imagePath);

        if (dbDeleteError) {
            console.error("DB delete error:", dbDeleteError);
            return res.status(500).send("Pildi kustutamine andmebaasist ebaõnnestus.");
        }

        if (storagePath) {
            const { error: storageDeleteError } = await supabase.storage
                .from(BUCKET_NAME)
                .remove([storagePath]);

            if (storageDeleteError) {
                console.error("Storage delete error:", storageDeleteError);
            }
        }

        return res.redirect("/admin/tehtudtood?success=1");
    } catch (error) {
        console.error("Admin delete error:", error);
        return res.redirect("/admin/tehtudtood");
    }
};