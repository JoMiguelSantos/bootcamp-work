const fs = require("fs");
const { readdir, stat } = require("fs").promises;

// Part 1
function recursiveAll(array) {
    // Wait for the promises to resolve
    return Promise.all(array).then(function (result) {
        // If no new promises were added, return the result
        if (result.length == array.length) return result;
        // If new promises were added, re-evaluate the array.
        return recursiveAll(array);
    });
}

const logSizes = (fullPath) =>
    new Promise((resolve, reject) => {
        let promises = [];
        readdir(fullPath, { withFileTypes: true })
            .then((files) => {
                for (let file of files) {
                    promises.push(
                        stat(`${fullPath}/${file.name}`)
                            .then((fileStats) => {
                                if (file.isFile()) {
                                    console.log(
                                        `${fullPath}/${file.name}: ${fileStats.size}`
                                    );
                                } else if (file.isDirectory()) {
                                    return logSizes(`${fullPath}/${file.name}`);
                                }
                            })
                            .catch((err) => console.log(err))
                    );
                }
                resolve(Promise.all(promises));
            })
            .catch((err) => reject(console.log(err)));
    });

logSizes(__dirname)
    .then(() => console.log("done!"))
    .catch(() => console.log("oops something went wrong"));

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
