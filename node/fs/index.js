const fs = require("fs");

// Part 1

function logSizes(fullPath) {
    fs.readdir(fullPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return console.error(err);
        }

        for (let file of files) {
            fs.stat(`${fullPath}/${file.name}`, (err, fileStats) => {
                if (err) {
                    return console.error(err);
                }
                if (file.isFile()) {
                    console.log(`${fullPath}/${file.name}: ${fileStats.size}`);
                } else if (file.isDirectory()) {
                    logSizes(`${fullPath}/${file.name}`);
                }
            });
        }
    });
}

logSizes(__dirname);

// Part 2

function mapSizes(fullPath) {
    const filesOrFolders = fs.readdirSync(fullPath, { withFileTypes: true });
    let folderFiles = {};
    for (let fileOrFolder of filesOrFolders) {
        if (fileOrFolder.isDirectory()) {
            folderFiles[fileOrFolder.name] = mapSizes(
                `${fullPath}/${fileOrFolder.name}`
            );
        } else if (fileOrFolder.isFile()) {
            folderFiles[fileOrFolder.name] = fs.statSync(
                `${fullPath}/${fileOrFolder.name}`
            ).size;
        }
    }
    return folderFiles;
}

let fsData = mapSizes(__dirname);
fs.writeFileSync("files.json", JSON.stringify(fsData, null, 4));
