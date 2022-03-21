const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
// const path = require("path");

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine('hbs', hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views")

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render('index', {title: "Main Page", isHome: true})
});

app.get("/notebooks", (req, res) => {
    res.render("notebooks", {title: "Notebooks", isNotebooks: true})
})

app.get("/add", (req, res) => {
    res.render("add", {title: "Add Notebook", isAdd: true})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})