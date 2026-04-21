const supabase = require("../config/supabase");

exports.getHinnakiri = async (req, res) => {
    const { data: categories, error: categoriesError } = await supabase
        .from("price_categories")
        .select("*")
        .order("sort_order", { ascending: true });

    if (categoriesError) {
        return res.status(500).send("Hinnakirja kategooriate laadimine ebaõnnestus.");
    }

    const { data: items, error: itemsError } = await supabase
        .from("price_items")
        .select("*")
        .order("category_id", { ascending: true })
        .order("sort_order", { ascending: true });

    if (itemsError) {
        return res.status(500).send("Teenuste laadimine ebaõnnestus.");
    }

    const { data: notes, error: notesError } = await supabase
        .from("price_category_notes")
        .select("*")
        .order("category_id", { ascending: true })
        .order("sort_order", { ascending: true });

    if (notesError) {
        return res.status(500).send("Märkuste laadimine ebaõnnestus.");
    }

    const message = req.session.successMessage;
    req.session.successMessage = null;

    res.render("admin/hinnakiri", {
        categories,
        items,
        notes,
        message
    });
};

exports.addItem = async (req, res) => {
    const { category_id, subgroup, name, description, price, sort_order } = req.body;

    const { error } = await supabase
        .from("price_items")
        .insert([
            {
                category_id,
                subgroup: subgroup || null,
                name,
                description: description || null,
                price: price || null,
                sort_order: Number(sort_order) || 1
            }
        ]);

    if (error) {
        return res.status(500).send("Teenuse lisamine ebaõnnestus.");
    }

    req.session.successMessage = "Teenus lisatud!";
    res.redirect("/admin/hinnakiri");
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { category_id, subgroup, name, description, price, sort_order } = req.body;

    const { error } = await supabase
        .from("price_items")
        .update({
            category_id,
            subgroup: subgroup || null,
            name,
            description: description || null,
            price: price || null,
            sort_order: Number(sort_order) || 1,
            updated_at: new Date().toISOString()
        })
        .eq("id", id);

    if (error) {
        return res.status(500).send("Teenuse muutmine ebaõnnestus.");
    }

    req.session.successMessage = "Teenus muudetud!";
    res.redirect("/admin/hinnakiri");
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("price_items")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(500).send("Teenuse kustutamine ebaõnnestus.");
    }

    req.session.successMessage = "Teenus kustutatud!";
    res.redirect("/admin/hinnakiri");
};

exports.addNote = async (req, res) => {
    const { category_id, text, sort_order } = req.body;

    const { error } = await supabase
        .from("price_category_notes")
        .insert([
            {
                category_id,
                text,
                sort_order: Number(sort_order) || 1
            }
        ]);

    if (error) {
        return res.status(500).send("Märkuse lisamine ebaõnnestus.");
    }

    req.session.successMessage = "Märkus lisatud!";
    res.redirect("/admin/hinnakiri");
};

exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { category_id, text, sort_order } = req.body;

    const { error } = await supabase
        .from("price_category_notes")
        .update({
            category_id,
            text,
            sort_order: Number(sort_order) || 1
        })
        .eq("id", id);

    if (error) {
        return res.status(500).send("Märkuse muutmine ebaõnnestus.");
    }

    req.session.successMessage = "Märkus muudetud!";
    res.redirect("/admin/hinnakiri");
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("price_category_notes")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(500).send("Märkuse kustutamine ebaõnnestus.");
    }

    req.session.successMessage = "Märkus kustutatud!";
    res.redirect("/admin/hinnakiri");
};