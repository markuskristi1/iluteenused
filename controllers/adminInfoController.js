const supabase = require("../config/supabase");

exports.getInfo = async (req, res) => {
    const { data: infoItems, error } = await supabase
        .from("info_pages")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        return res.status(500).send("Info laadimine ebaõnnestus.");
    }

    const message = req.session.successMessage;
    req.session.successMessage = null;

    res.render("admin/info", {
        infoItems: infoItems || [],
        message
    });
};

exports.addInfoItem = async (req, res) => {
    const { title, content, sort_order } = req.body;

    const { error } = await supabase
        .from("info_pages")
        .insert([
            {
                title,
                content: content || "",
                sort_order: Number(sort_order) || 1
            }
        ]);

    if (error) {
        return res.status(500).send("Info lisamine ebaõnnestus.");
    }

    req.session.successMessage = "Info lisatud!";
    res.redirect("/admin/info");
};

exports.updateInfoItem = async (req, res) => {
    const { id } = req.params;
    const { title, content, sort_order } = req.body;

    const { error } = await supabase
        .from("info_pages")
        .update({
            title,
            content: content || "",
            sort_order: Number(sort_order) || 1
        })
        .eq("id", id);

    if (error) {
        return res.status(500).send("Info muutmine ebaõnnestus.");
    }

    req.session.successMessage = "Info muudetud!";
    res.redirect("/admin/info");
};

exports.deleteInfoItem = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("info_pages")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(500).send("Info kustutamine ebaõnnestus.");
    }

    req.session.successMessage = "Info kustutatud!";
    res.redirect("/admin/info");
};