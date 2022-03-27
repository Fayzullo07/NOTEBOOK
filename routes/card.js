const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.post("/add", async (req, res) => {
    const notebook = await Notebook.findById(req.body.id);
    await req.user.addToCart( notebook );
    res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
    const card = await Card.remove(req.params.id);
    res.status(200).send(card)
});

router.get("/", async (req, res) => {
    const card = await Card.fetch();
    res.render("card", {
        title: "Basket",
        isCard: true,
        notebooks: card.notebooks,
        price: card.price,
    });
});

module.exports = router;