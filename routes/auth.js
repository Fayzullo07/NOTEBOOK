const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { validationResult } = require("express-validator/check");
const { registerValidators } = require("../utils/validators");
const router = Router();

// LOGIN
router.get("/login", async (req, res) => {
  res.render("auth/login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const samePass = await bcrypt.compare(password, user.password);
      if (samePass) {
        req.session.user = user;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;

          res.redirect("/");
        });
      } else {
        return res.status(422).render("auth/login", {
          title: "Login",
          error: "Password wrong",
          email,
        });
      }
    } else {
      return res.status(422).render("auth/login", {
        title: "Login",
        error: "This username does not found",
        email,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// REGISTER
router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register" });
});

router.post("/register", registerValidators, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/register", {
        title: "Register",
        error: errors.array()[0].msg,
        data: {
          email,
          name,
          password,
        },
      });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPass,
      cart: { items: [] },
    });

    await user.save();
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
});

// LOGOUT

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

module.exports = router;
