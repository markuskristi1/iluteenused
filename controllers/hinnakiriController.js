const supabase = require("../config/supabase");

exports.hinnakiri = async (req, res) => {
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
        .order("sort_order", { ascending: true });

    if (itemsError) {
        return res.status(500).send("Hinnakirja teenuste laadimine ebaõnnestus.");
    }

    const { data: notes, error: notesError } = await supabase
        .from("price_category_notes")
        .select("*")
        .order("sort_order", { ascending: true });

    if (notesError) {
        return res.status(500).send("Hinnakirja märkuste laadimine ebaõnnestus.");
    }

    const mergedCategories = categories.map(category => {
        const categoryItems = items.filter(item => item.category_id === category.id);
        const categoryNotes = notes
            .filter(note => note.category_id === category.id)
            .map(note => note.text);

        if (category.id === "juuksepikendused") {
            const keratiinItems = categoryItems
                .filter(item => item.subgroup === "Keratiin juuksepikendused")
                .map(item => ({
                    name: item.name,
                    description: item.description || "",
                    price: item.price || ""
                }));

            const teipItems = categoryItems
                .filter(item => item.subgroup === "Teip juuksepikendused")
                .map(item => ({
                    name: item.name,
                    description: item.description || "",
                    price: item.price || ""
                }));

            return {
                id: category.id,
                title: category.title,
                groups: [
                    {
                        title: "Keratiin juuksepikendused",
                        items: keratiinItems
                    },
                    {
                        title: "Teip juuksepikendused",
                        items: teipItems
                    }
                ],
                notes: categoryNotes
            };
        }

        return {
            id: category.id,
            title: category.title,
            items: categoryItems.map(item => ({
                name: item.name,
                description: item.description || "",
                price: item.price || ""
            })),
            notes: categoryNotes
        };
    });

    res.render("hinnakiri", { categories: mergedCategories });
};