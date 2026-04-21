const supabase = require("../config/supabase");

const tehtudtood = async (req, res) => {
    const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true });


    if (error) {
        return res.status(500).send("Galerii laadimine ebaõnnestus: " + error.message);
    }

    const kuuned = data
        .filter(item => item.category === "kuuned")
        .map(item => item.image_url);

    const juuksed = data
        .filter(item => item.category === "juuksed")
        .map(item => item.image_url);

    res.render("tehtudtood", { kuuned, juuksed });
};

module.exports = { tehtudtood };