// Import modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Connect to db
mongoose.connect("mongodb://localhost/CRUD_Node");
let db = mongoose.connection;

// Check connection
db.once("open", () => {
    console.log("Connected to MongoDB");
})

// Check for DB errors
db.on("error", err => {
    console.log(err);
})

// Init Express App
const app = express();

// Import Models
let Article = require("./models/articles");

// Load View Enigne
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Home Route
app.get("/", (req, res) => {
    Article.find({}, (err, articles) => {
        console.log(articles);
        if(err) {
            console.log(err);
        } else {
            res.render("index", {
                title: "Articles",
                articles
            });
        } 
    });
})

// Add Route
app.get("/articles/add", (req, res) => {
    res.render("add_article", {
        title: "Add Article"
    })
})

// Listen to port
app.listen(3000, () => {
    console.log("Listening on port 3000...");
})