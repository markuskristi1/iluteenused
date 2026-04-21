const fs = require("fs");
const path = require("path");

const galleryPath = path.join(__dirname, "../data/gallery.json");

function readGallery() {
    return JSON.parse(fs.readFileSync(galleryPath, "utf-8"));
}

function writeGallery(data) {
    fs.writeFileSync(galleryPath, JSON.stringify(data, null, 2), "utf-8");
}

exports.getTehtudtood = (req, res) => {
    const data = readGallery();

    res.render("admin/tehtudtood", {
        kuuned: data.kuuned || [],
        juuksed: data.juuksed || [],
        success: req.query.success || "",
        error: ""
    });
};

exports.uploadImage = (req, res) => {
    try {
        const { category } = req.body;

        if (!req.file) {
            const data = readGallery();
            return res.status(400).render("admin/tehtudtood", {
                kuuned: data.kuuned || [],
                juuksed: data.juuksed || [],
                success: "",
                error: "Palun vali pilt."
            });
        }

        if (!["kuuned", "juuksed"].includes(category)) {
            const data = readGallery();
            return res.status(400).render("admin/tehtudtood", {
                kuuned: data.kuuned || [],
                juuksed: data.juuksed || [],
                success: "",
                error: "Vale kategooria."
            });
        }

        const data = readGallery();
        data[category].push(`/uploads/${category}/${req.file.filename}`);
        writeGallery(data);

        res.redirect("/admin/tehtudtood?success=1");
    } catch (error) {
        console.error("Upload error:", error);
        const data = readGallery();
        res.status(500).render("admin/tehtudtood", {
            kuuned: data.kuuned || [],
            juuksed: data.juuksed || [],
            success: "",
            error: "Pildi lisamisel tekkis viga."
        });
    }
};

exports.deleteImage = (req, res) => {
    try {
        const { category, imagePath } = req.body;

        if (!["kuuned", "juuksed"].includes(category)) {
            return res.redirect("/admin/tehtudtood");
        }

        const data = readGallery();
        data[category] = data[category].filter((img) => img !== imagePath);
        writeGallery(data);

        const fullPath = path.join(__dirname, "../public", imagePath);

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }

        res.redirect("/admin/tehtudtood?success=1");
    } catch (error) {
        console.error("Delete error:", error);
        res.redirect("/admin/tehtudtood");
    }
};