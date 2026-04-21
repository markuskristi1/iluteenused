const supabase = require("../config/supabase");

exports.getKontakt = async (req, res) => {
    const { data, error } = await supabase
        .from("contact")
        .select("*")
        .order("id", { ascending: true })
        .maybeSingle();

    if (error) {
        return res.status(500).send("Kontakti laadimine ebaõnnestus.");
    }

    if (!data) {
        return res.status(500).send("Kontakti tabelis puuduvad andmed.");
    }

    const message = req.session.successMessage;
    req.session.successMessage = null;

    res.render("admin/kontakt", { data, message });
};

exports.updateKontakt = async (req, res) => {
    const { address, hours, phone } = req.body;

    const { data: existing, error: fetchError } = await supabase
        .from("contact")
        .select("id")
        .order("id", { ascending: true })
        .maybeSingle();

    if (fetchError) {
        return res.status(500).send("Kontakti uuendamine ebaõnnestus.");
    }

    if (!existing) {
        return res.status(500).send("Kontakti tabelis puuduvad andmed.");
    }

    const { error } = await supabase
        .from("contact")
        .update({
            address,
            hours,
            phone,
            updated_at: new Date().toISOString()
        })
        .eq("id", existing.id);

    if (error) {
        return res.status(500).send("Kontakti salvestamine ebaõnnestus.");
    }

    req.session.successMessage = "Salvestatud!";
    res.redirect("/admin/kontakt");
};