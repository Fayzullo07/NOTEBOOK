const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const homeRoutes = require("./routes/home");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const ordersRouter = require("./routes/orders");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const varMiddleware = require("./middleware/var");
const userMiddleware = require("./middleware/user");

const MONGODB_URI = "mongodb+srv://fayzullo:F4995875f@cluster0.tpf56.mongodb.net/shop";

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const store = new MongoStore({
    collection: "sessions",
    uri: MONGODB_URI,
});

app.engine('hbs', hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "secret val",
    resave: false,
    saveUninitialized: false,
    store,
}));
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRouter);
app.use("/auth", authRoutes);


async function start() {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
        // const candidate = await User.findOne();
        // if (!candidate) {
        //     const user = new User({
        //         email: "fayzulloh@gmail.com",
        //         name: "Fayzulloh",
        //         cart: { items: [] },
        //     });
        //     await user.save();
        // }
        const PORT = process.env.PORT || 5000;
        
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();
