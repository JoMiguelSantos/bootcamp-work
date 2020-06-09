const express = require("express");
const app = express();
const basicAuth = require("basic-auth");

const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!creds || creds.name != "incognito" || creds.pass != "abacadabra") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="What\'s the password??"'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

app.use((req, res, next) => {
    if (req.url === "/panes/") {
        auth(req, res, next);
    } else {
        next();
    }
});

app.use(require("cookie-parser")());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());
app.use((req, res, next) => {
    if ("/cookies" === req.url) {
        return next();
    }
    if (req.cookies["authorized"] === "true") {
        return next();
    }

    res.cookie("originalUrl", req.url);
    res.redirect("/cookies");
});
app.use(express.static(__dirname + "/projects"));

app.get("/", (req, res) => {
    if (!req.cookies) {
        res.cookie("originalUrl", req.url);
        res.redirect("/cookies");
    }
    res.send("");
});

const cookiesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Express</title>
</head>
<body>
  <form method="post" action="/cookies">
    <label for="cookies">To proceed using this website, it's required to accept cookies. 
    Please check the box if you agree that we use cookies.</label>
    <input type="checkbox" name="cookies">
    <input type="submit" />
  </form>
</body>
</html>`;

app.get("/cookies", (req, res) => {
    res.send(cookiesHtml);
});

app.post("/cookies", (req, res) => {
    if (req.body.cookies) {
        res.cookie("authorized", "true");
        res.redirect((req.cookies && req.cookies["originalUrl"]) || "/");
    } else {
        res.send(
            cookiesHtml +
                "<p>You REALLY need to accept these cookies or else you cannot you this website.</p>"
        );
    }
});

app.listen(8080);
