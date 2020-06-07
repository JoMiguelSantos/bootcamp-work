const fs = require("fs");

exports.buildHtml = () => {
    // read contents of the projects
    let html = "";
    const folders = fs.readdirSync(__dirname + "/projects");
    console.log("buildHtml folders", folders);
    for (let folder of folders) {
        html += `<li><a href=${folder}>${folder}</a></li>`;
    }
    html = `<ul>${html}</ul>`;
    console.log("buildHtml html", html);
    return html;
};
