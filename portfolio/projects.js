const fs = require("fs");

exports.buildHtml = () => {
    let html = "";
    const folders = fs.readdirSync(__dirname + "/projects");
    for (let folder of folders) {
        html += `<li><a href=${folder}>${folder}</a></li>`;
    }
    html = `<ul>${html}</ul>`;
    return html;
};
