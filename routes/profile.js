const {Router} = require("express");
const router = Router();

router.get("/", async (req, res) => {
    res.render("profile", {
        title: "Profile",
        isProfile: true,
        user: req.user.toObject()
    });
});

router.post("/", async (req, res) => {

})

module.exports = router;