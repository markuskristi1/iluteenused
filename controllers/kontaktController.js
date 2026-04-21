const supabase = require("../config/supabase");

/* exports.showKontakt = async (req, res) => {
    const { data, error } = await supabase
        .from("contact")
        .select("*")
        .order("id", { ascending: true })
        .maybeSingle();


    if (error) {
        return res.status(500).send("Kontakti laadimine ebaõnnestus: " + error.message);
    }

    if (!data) {
        return res.status(500).send("Kontakti tabelis puuduvad andmed.");
    }

    res.render("kontakt", { data });
}; */

exports.showKontakt = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("contact")
            .select("*")
            .order("id", { ascending: true })
            .maybeSingle();

        if (error) {
            return res.status(500).send("Kontakti laadimine ebaõnnestus: " + error.message);
        }

        res.render("kontakt", {
            data: data || {
                address: "",
                hours: "",
                phone: ""
            }
        });
    } catch (err) {
        console.error("Kontakt page error:", err);

        res.status(500).render("kontakt", {
            data: {
                address: "",
                hours: "",
                phone: ""
            }
        });
    }
};