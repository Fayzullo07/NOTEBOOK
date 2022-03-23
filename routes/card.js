const { Router } = require("express");
const Card = require("../models/card");
const Notebook = require("../models/notebook");
const router = Router();

router.post("/add", async (req, res) => {
    const notebook = await Notebook.getById(req.body.id);
    await Card.add(notebook);
    res.redirect("/card");
});


router.get("/", async (req, res) => {
    const card = await Card.fetch();
    res.render("card", {
        title: "Basket",
        isCard: true,
        card,
    });
});

module.exports = router;