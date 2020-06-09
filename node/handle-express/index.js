const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const fs = require("fs");

const capitalize = (text, separator = "-") => {
    return text
        .split(separator)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

let projects = fs.readdirSync(__dirname + "/projects");
projects = projects.map((project) => {
    return {
        name: capitalize(project),
        directory: project,
        screenshot: `${project}/${project}.png`,
    };
});

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("projects"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home", { projects });
});

app.listen(8080);
