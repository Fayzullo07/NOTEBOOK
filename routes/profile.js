const bcrypt = require("bcryptjs");
const { Router } = require("express");
const { validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const router = Router();
const { updateProfileValidators } = require("../utils/validators");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.get("/", auth, async (req, res) => {
  res.render("profile", {
    title: "Profile",
    user: req.user,
  });
});

router.post("/", upload.single("photo"), auth, updateProfileValidators, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(422).render("profile", {
        title: "Profile",
        error: errors.array()[0].msg,
        user: {
          email,
          name,
        },
        password,
      });
    }
    
    const object_photo = {};

    // Upload image to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      object_photo.photoUrl = result.secure_url;
    }

    const hashPass = await bcrypt.hash(password, 10);
    await req.user.updateProfile(name, email, hashPass, object_photo);
    req.session.user = req.user;
    req.session.save();

    res.render("profile", {
      title: "Profile",
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
