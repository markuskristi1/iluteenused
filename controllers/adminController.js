exports.dashboard = (req, res) => {
    res.render("admin/dashboard", {
        username: req.session.username || "admin"
    });
};