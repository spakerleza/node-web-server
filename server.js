const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

// Middleware
app.use((req, res, next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append to server.log.");
        }
    });
    next();
});
app.use((req, res, next) => {
    res.render("maintenance");
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("currentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});


app.get("/", (req, res) => {
    res.render("home", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my first node web application.",
        // currentYear: new Date().getFullYear(),
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        pageTitle: "About Page",
        // currentYear: new Date().getFullYear(),
    });
});


app.get("/bad", (req, res) => {
    res.send({
        error: "Bad request sent"
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});