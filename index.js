const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const ordersRouter = require("./routes/orders");
const User = require("./models/user");

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
    try {
        const user = await User.findById("6240bb20cbf670237e093fc5");
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }
})

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRouter);


async function start() {
    try {
        const url = "mongodb+srv://fayzullo:F4995875f@cluster0.tpf56.mongodb.net/shop";
        await mongoose.connect(url, { useNewUrlParser: true });
        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: "fayzulloh@gmail.com",
                name: "Fayzulloh",
                cart: { items: [] },
            });
            await user.save();
        }
        const PORT = process.env.PORT || 5000;
        
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();
