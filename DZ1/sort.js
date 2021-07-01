const fs = require('fs');
const path = require('path');

function mkDir(folderPath, folderName){
    return new Promise(resolve => {
        fs.mkdir(folderPath, { recursive: true }, (err) => {
            if (err) throw err;
            console.log('Directory %s was created', folderName);
            resolve('Directory %s was created', folderName);
        });
    });
}

function copyFile(fileFrom, fileTo, file){
    return new Promise(resolve => {
        fs.copyFile(fileFrom, fileTo, (err) => {
            if (err) throw err;
            console.log('File %s was copied', file);
            resolve('File %s was copied', file);
        });
    });
}

function deleteFile(filePath, file){
    return new Promise(resolve => {
        fs.unlink(filePath, err => {
            if (err) throw err;
            console.log('File %s was deleted', file);
            resolve('File %s was deleted', file);
        });
    });
}

async function sortFiles(input, output) {
    try {
        const files = fs.readdirSync(input);

        for (var i = 0; i < files.length; i++) {
            const file = files[i];
            const localBase = path.join(input, file);
            const state = fs.statSync(localBase);

            if (state.isDirectory()) {
                await sortFiles(localBase, output);
            } else {
                const folderName = file.charAt(0);
                const folderPath = path.join(output, folderName);
                const fileFrom = localBase;
                const fileTo = path.join(folderPath, file);

                await mkDir(folderPath, folderName);
                await copyFile(fileFrom, fileTo, file);
                await deleteFile(fileFrom, file);
            }
        }

        fs.rmdirSync(input);

    } catch (e) {
        console.error('outer', e.message);
    }      
}

module.exports = sortFiles;