const {Router} = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", async (req, res) => {
    const notebooks = await Notebook.getAll();
    console.log(notebooks)
    res.render("notebooks", {title: "Notebooks", isNotebooks: true, notebooks});
});

module.exports = router;