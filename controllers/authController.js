const bcrypt = require("bcrypt");

exports.showLogin = (req, res) => {
    if (req.session?.isAdmin) {
        return res.redirect("/admin");
    }

    res.render("login", { error: null });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).render("login", {
                error: "Palun sisesta kasutajanimi ja parool."
            });
        }

        const users = [
            {
                username: process.env.ADMIN_USERNAME,
                passwordHash: process.env.ADMIN_PASSWORD_HASH
            },
            {
                username: process.env.ADMIN2_USERNAME,
                passwordHash: process.env.ADMIN2_PASSWORD_HASH
            }
        ];

        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(401).render("login", {
                error: "Vale kasutajanimi või parool."
            });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).render("login", {
                error: "Vale kasutajanimi või parool."
            });
        }

        req.session.isAdmin = true;
        req.session.username = user.username;

        res.redirect("/admin");
    } catch {
        res.status(500).render("login", {
            error: "Sisselogimisel tekkis viga."
        });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
};