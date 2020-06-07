const http = require("http");
const fs = require("fs");
const path = require("path");
const buildHtml = require("./projects").buildHtml;

const PORT = 8080;

const server = http.createServer((req, res) => {
    console.log(req.method, req.url, req.headers);

    const filePath = __dirname + "/projects" + req.url;
    if (req.method === "GET") {
        if (!path.normalize(filePath).startsWith(__dirname + "/projects")) {
            res.statusCode = 403;
            console.log("INTRUDER ALERT!");
            return res.end();
        }

        if (req.url === "/") {
            const html = buildHtml();
            console.log("homepage", html);

            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            res.end(html);
        }

        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.log("error in fs.stat: ", err);
                res.statusCode = 404;
                return res.end();
            }
            console.log("filePath: ", filePath);
            if (stats.isFile()) {
                console.log("its a file!");
                const extension = path.extname(filePath);
                console.log("extension: ", extension);
                switch (extension) {
                    case ".html":
                        res.setHeader("Content-Type", "text/html");
                        break;
                    case ".css":
                        res.setHeader("Content-Type", "text/css");
                        break;
                    case ".js":
                        res.setHeader("Content-Type", "text/javascript");
                        break;
                    case ".json":
                        res.setHeader("Content-Type", "application/json");
                        break;
                    case ".gif":
                        res.setHeader("Content-Type", "image/gif");
                        break;
                    case ".jpg":
                        res.setHeader("Content-Type", "image/jpeg");
                        break;
                    case ".png":
                        res.setHeader("Content-Type", "image/png");
                        break;
                    case ".svg":
                        res.setHeader("Content-Type", "image/svg+xml");
                        break;
                    default:
                        res.end(`The file type ${extension} is not allowed`);
                }
                const readStreamHtml = fs.createReadStream(filePath);
                readStreamHtml.pipe(res);
                readStreamHtml.on("error", (err) => {
                    console.log(err);
                    res.statusCode = 500;
                    res.end();
                });
            } else {
                console.log("its a directory!");
                if (req.url.endsWith("/")) {
                    const readStreamHtml = fs.createReadStream(
                        req.url + "index.html"
                    );
                    readStreamHtml.pipe(res);
                    readStreamHtml.on("error", (err) => {
                        console.log(err);
                        res.statusCode = 500;
                        res.end();
                    });
                } else {
                    res.statusCode = 302;
                    res.setHeader("Location", `${req.url}/index.html`);
                    res.end();
                }
            }
        });
    } else {
        res.statusCode = 405;
        res.end(
            `${req.method} is not an allowed method. Only GET requests are allowed.`
        );
    }
});

server.listen(PORT, () => console.log("Listening... on Port:" + PORT));
