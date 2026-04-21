/* const supabase = require("../config/supabase");

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
    } catch (err) {
        console.error(err);
        res.status(500).send("Serveri viga");
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const { category } = req.body;

        if (!req.file) {
            return res.redirect("/admin/tehtudtood");
        }

        if (!["kuuned", "juuksed"].includes(category)) {
            return res.redirect("/admin/tehtudtood");
        }

        const imageUrl = `/uploads/${category}/${req.file.filename}`;

        const { error } = await supabase
            .from("gallery_images")
            .insert([
                {
                    image_url: imageUrl,
                    category,
                    sort_order: 1
                }
            ]);

        if (error) {
            return res.status(500).send("Pildi salvestamine DB-sse ebaõnnestus.");
        }

        res.redirect("/admin/tehtudtood?success=1");
    } catch (err) {
        console.error(err);
        res.redirect("/admin/tehtudtood");
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const { imagePath } = req.body;

        if (!imagePath) {
            return res.redirect("/admin/tehtudtood");
        }

        const { error } = await supabase
            .from("gallery_images")
            .delete()
            .eq("image_url", imagePath);

        if (error) {
            return res.status(500).send("Pildi kustutamine ebaõnnestus.");
        }

        // kustutame ka faili serverist
        const fs = require("fs");
        const path = require("path");

        const fullPath = path.join(__dirname, "../public", imagePath);

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }

        res.redirect("/admin/tehtudtood?success=1");
    } catch (err) {
        console.error(err);
        res.redirect("/admin/tehtudtood");
    }
}; */