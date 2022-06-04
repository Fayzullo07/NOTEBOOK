const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const path = require("path");
const exphbs = require("express-handlebars");
const { PORT, MONGO_URL } = require("./config");

// ROUTES
const homeRoutes = require("./routes/home");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const ordersRoutes = require("./routes/orders");

// MIDDLEWARES
const varMiddleware = require("./middleware/var");
const userMiddleware = require("./middleware/user");
const errorPage = require("./middleware/error");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: require("./utils"),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const store = new MongoStore({
  collection: "sessions",
  uri: MONGO_URL,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret val",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/orders", ordersRoutes);
app.use(errorPage);

async function start() {
  try {
    await mongoose.connect(MONGO_URL);

    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
