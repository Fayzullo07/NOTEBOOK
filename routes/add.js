const { Router } = require("express");
const { validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const Notebook = require("../models/notebook");
const router = Router();
const { notebookValidators } = require("../utils/validators");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.get("/", auth, (req, res) => {
  res.render("add", { title: "Add Notebook" });
});

router.post(
  "/",
  upload.single("img"),
  auth,
  notebookValidators,
  async (req, res) => {
    const errors = validationResult(req);
    const { title, price, descr } = req.body;
    if (!errors.isEmpty()) {
      return res.status(422).render("add", {
        title: "Add Notebook",
        error: errors.array()[0].msg,
        data: {
          title,
          price,
          descr,
        },
      });
    }

    const notebook = new Notebook({
      title,
      price,
      img: await (await cloudinary.uploader.upload(req.file.path)).secure_url,
      descr,
      userId: req.user,
    });

    try {
      await notebook.save();
      res.redirect("/notebooks");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
