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
    let description;
    switch (project) {
        case "carrousel":
            description =
                "This project is essentially kittens sliding every 5 seconds to another kitten.";
            break;
        case "connect-four":
            description =
                "This project is a spin on the popular Connect Four game which can be played with either drag and drop on clicking on the columns to drop the puck in the slot.";
            break;
        case "panes":
            "This project will take you from London to a paradisiac beach :) Just slide the bar to let the fun begin!";
            break;
        case "spotify-search":
            "This project uses the Spotify API to search for albums and artists and returning their images and link to Spotify for listening to their music.";
            break;
        default:
            description = null;
    }
    return {
        name: capitalize(project),
        directory: `/${project}`,
        link: `/project/${project}`,
        screenshot: `/${project}/${project}.png`,
        description,
    };
});

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");

app.use(express.static("projects"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home", { projects });
});

app.get("/project/:project", (req, res) => {
    const project = projects.find((project) => {
        return `/${req.params.project}` === project.directory;
    });
    console.log(project);

    if (project) {
        res.render("project", {
            layout: "project",
            projects,
            project,
            helpers: {
                currentProject(link, curDir) {
                    if (link === curDir) {
                        return "highlight";
                    }
                    return "";
                },
            },
        });
    } else {
        console.log("not found");
        res.sendStatus(404);
    }
});

app.listen(8080);
