const { Router } = require("express");
const router = Router();
const Notebooks = require("../models/notebook");

router.get("/", async (req, res) => {
  const notebooks_images = await Notebooks.find().select("img");
  res.render("index", {
    title: "Main Page",
    notebooks_images,
  });
});

module.exports = router;
