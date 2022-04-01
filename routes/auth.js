 const {Router} = require("express");
 const User = require("../models/user"); 
 const router = Router();


 router.get("/login", async (req, res) => {
     res.render("auth/login", {
         title: "Register",
         isLogin: true
     });
 });

 router.get("/logout", async (req, res) => {
     req.session.destroy(() => {
        res.redirect("/auth/login#login");
     });
 })

 router.post("/login", async (req, res) => {
     const user = await User.findById("6240bb20cbf670237e093fc5");
     req.session.user = user;
     req.session.isAuthenticated = true;
     req.session.save(err => {
         if(err) throw err;
         res.redirect("/");
     });
 });

 router.post("/register", async (req, res) => {
     try {
        const {email, password, name} = req.body;
        const candidate = await User.findOne({email});

        if(candidate) {
            res.redirect("/auth/login#register")
        }
     } catch (e) {
         console.log(e);
     }
 })


 module.exports = router;