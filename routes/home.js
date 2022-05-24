const {Router} = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", async (req, res) => {
    const notebooks = await Notebook.find()
      .populate("userId", "email name")
      .select("price title img descr");

    res.render("index", {
        title: "Main Page",
        isHome: true,
        notebooks,
      });
});

module.exports = router;