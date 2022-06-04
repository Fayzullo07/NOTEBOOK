const { Router } = require("express");
const { validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Notebook = require("../models/notebook");
const { notebookValidators } = require("../utils/validators");
const router = Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.get("/", async (req, res) => {
  try {
    const notebooks = await Notebook.find()
      .populate("userId", "email name")
      .select("price title img descr");
    notebooks.reverse();
    res.render("notebooks", {
      title: "Notebooks",
      userId: req.user ? req.user._id.toString() : null,
      notebooks,
      count: req.user ? req.user.cart.items.length : 0,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  try {
    const notebook = await Notebook.findById(req.params.id);
    res.render("notebook-edit", {
      title: `Edit ${notebook.title}`,
      notebook,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/edit",
  upload.single("img"),
  auth,
  notebookValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { title, price, descr, id } = req.body;
      if (!errors.isEmpty()) {
        return res.render("notebook-edit", {
          title: `Edit ${title}`,
          error: errors.array()[0].msg,
          notebook: {
            title,
            price,
            descr,
            id
          },
        });
      }

      await Notebook.findByIdAndUpdate(req.body.id, {
        title,
        price,
        img: await (await cloudinary.uploader.upload(req.file.path)).secure_url,
        descr,
      });
      res.redirect("/notebooks");
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/remove", auth, async (req, res) => {
  try {
    await Notebook.deleteOne({ _id: req.body.id });
    res.redirect("/notebooks");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const notebook = await Notebook.findById(req.params.id);
  res.render("notebook", {
    layout: "detail",
    title: `Notebook ${notebook.title}`,
    notebook,
  });
});

module.exports = router;
