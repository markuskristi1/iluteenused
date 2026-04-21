/* require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const supabase = require("./config/supabase");

const app = express();

const hinnakiriRoutes = require("./routes/hinnakiriRoutes");
const tehtudtoodRoutes = require("./routes/tehtudtoodRoutes");
const infoRoutes = require("./routes/infoRoutes");
const kontaktRoutes = require("./routes/kontaktRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 4
        }
    })
);

app.set("view engine", "ejs");

app.use((req, res, next) => {
    res.locals.isAdmin = !!req.session?.isAdmin;
    res.locals.adminUsername = req.session?.username || null;
    next();
});

app.use(async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from("price_categories")
            .select("*")
            .order("sort_order", { ascending: true });

        res.locals.categories = error ? [] : data || [];
        next();
    } catch (err) {
        res.locals.categories = [];
        next();
    }
});

app.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true });

    if (error) {
        return res.render("index", {
            sliderImages: [],
            previewImages: []
        });
    }

    const kuuned = data
        .filter(item => item.category === "kuuned")
        .map(item => item.image_url);

    const juuksed = data
        .filter(item => item.category === "juuksed")
        .map(item => item.image_url);

    const sliderImages = [...kuuned.slice(0, 3), ...juuksed.slice(0, 2)].slice(0, 5);
    const previewImages = [...kuuned.slice(0, 3), ...juuksed.slice(0, 3)].slice(0, 6);

    res.render("index", {
        sliderImages,
        previewImages
    });
});

app.use("/", authRoutes);
app.use("/admin", adminRoutes);

app.use("/hinnakiri", hinnakiriRoutes);
app.use("/tehtudtood", tehtudtoodRoutes);
app.use("/info", infoRoutes);
app.use("/kontakt", kontaktRoutes);

app.listen(process.env.PORT || 5203, () => {
    console.log(`Server töötab: http://localhost:${process.env.PORT || 5203}`);
}); */

require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const supabase = require("./config/supabase");

const app = express();

const hinnakiriRoutes = require("./routes/hinnakiriRoutes");
const tehtudtoodRoutes = require("./routes/tehtudtoodRoutes");
const infoRoutes = require("./routes/infoRoutes");
const kontaktRoutes = require("./routes/kontaktRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 4
        }
    })
);

app.set("view engine", "ejs");

app.use((req, res, next) => {
    res.locals.isAdmin = !!req.session?.isAdmin;
    res.locals.adminUsername = req.session?.username || null;
    next();
});

app.use(async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from("price_categories")
            .select("*")
            .order("sort_order", { ascending: true });

        res.locals.categories = error ? [] : data || [];
        next();
    } catch (err) {
        console.error("Price categories middleware error:", err);
        res.locals.categories = [];
        next();
    }
});

app.get("/", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("gallery_images")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) {
            return res.render("index", {
                sliderImages: [],
                previewImages: []
            });
        }

        const safeData = data || [];

        const kuuned = safeData
            .filter(item => item.category === "kuuned")
            .map(item => item.image_url);

        const juuksed = safeData
            .filter(item => item.category === "juuksed")
            .map(item => item.image_url);

        const sliderImages = [...kuuned.slice(0, 3), ...juuksed.slice(0, 2)].slice(0, 5);
        const previewImages = [...kuuned.slice(0, 3), ...juuksed.slice(0, 3)].slice(0, 6);

        res.render("index", {
            sliderImages,
            previewImages
        });
    } catch (err) {
        console.error("Home page error:", err);

        res.render("index", {
            sliderImages: [],
            previewImages: []
        });
    }
});

app.use("/", authRoutes);
app.use("/admin", adminRoutes);

app.use("/hinnakiri", hinnakiriRoutes);
app.use("/tehtudtood", tehtudtoodRoutes);
app.use("/info", infoRoutes);
app.use("/kontakt", kontaktRoutes);

app.listen(process.env.PORT || 5203, () => {
    console.log(`Server töötab: http://localhost:${process.env.PORT || 5203}`);
});