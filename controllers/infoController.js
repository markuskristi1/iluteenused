const supabase = require("../config/supabase");

exports.info = async (req, res) => {
    const { data: infoItems, error } = await supabase
        .from("info_pages")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        return res.status(500).send("Info laadimine ebaõnnestus: " + error.message);
    }

    res.render("info", {
        infoItems: infoItems || []
    });
};