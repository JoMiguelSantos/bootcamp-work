/* eslint-disable indent */
const http = require("http");
const fs = require("fs");

const PORT = 8080;
const htmlRes =
    "<!doctype html><html><title>Hello World!</title><p>Hello World!</html>";

const server = http.createServer((req, res) => {
    let body = "";
    console.log(req.method, req.url, req.headers);

    fs.appendFile(
        "requests.txt",
        JSON.stringify(
            {
                req_date: Date.now(),
                req_method: req.method,
                req_url: req.url,
                "user-agent": req.headers["user-agent"],
            },
            null,
            "\t"
        ),
        (err) => {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
        }
    );

    req.on("data", (chunk) => (body += chunk))
        .on("end", () => console.log(body))
        .on("error", (error) => console.log(error));

    switch (req.method) {
        case "GET":
            if (req.url === "/requests.txt") {
                console.log(__dirname + req.url);

                res.setHeader("Content-Type", "text/plain");
                const readStream = fs.createReadStream(__dirname + req.url);

                readStream.on("open", function () {
                    readStream.pipe(res);
                });

                readStream.on("end", () => res.end());

                readStream.on("error", function (err) {
                    res.end(err);
                });
            } else {
                res.setHeader("Content-Type", "text/html");
                res.statusCode = 200;
                res.write(htmlRes);
                res.end();
            }
            break;
        case "POST":
            console.log(body);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            res.end();
            break;
        case "HEAD":
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            res.end();
            break;
        default:
            res.statusCode = 405;
            res.end(
                `${req.method} is not an allowed method. Only GET/POST/HEAD requests are allowed.`
            );
    }
});

server.listen(PORT, () => console.log("Listening... on Port:" + PORT));
