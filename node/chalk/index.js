/* eslint-disable indent */
const http = require("http");
const chalk = require("chalk");
const qs = require("querystring");

const PORT = 8080;

const initHtml = `<!doctype html>
<html>
<title>Colors</title>
<form method="POST">
  <input type="text" name="text">
  <select name="color">
    <option value="red">red</option>
    <option value="blue">blue</option>
    <option value="green">green</option>
    <option value="yellow">yellow</option>
    <option value="gray">gray</option>
    <option value="magenta">magenta</option>
    <option value="cyan">cyan</option>
  </select>
  <button type="submit">Go</button>
</form>
</html>`;

const server = http.createServer((req, res) => {
    let body = "";
    console.log(req.method, req.url, req.headers);
    let parsed;
    let postHtml;

    req.on("data", (chunk) => (body += chunk))
        .on("end", () => {
            parsed = qs.parse(body);
            postHtml = `<!doctype html>
<html>
<title>${parsed.text}</title>
<a href="/" style="color:${parsed.color}">${parsed.text}</a>
</html>`;
            switch (req.method) {
                case "GET":
                    res.setHeader("Content-Type", "text/html");
                    res.statusCode = 200;
                    res.write(initHtml);
                    res.end();
                    break;
                case "POST":
                    console.log(chalk[parsed.color](parsed.text));
                    res.setHeader("Content-Type", "text/html");
                    res.statusCode = 200;
                    res.write(postHtml);
                    res.end();
                    break;
                default:
                    res.statusCode = 405;
                    res.end(
                        `${req.method} is not an allowed method. Only GET/POST requests are allowed.`
                    );
            }
        })
        .on("error", (error) => console.log(error));
});

server.listen(PORT, () => console.log("Listening... on Port: " + PORT));
