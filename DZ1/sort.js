const fs = require('fs');
const path = require('path');

const output = path.join(__dirname, 'output');

const sortFiles = (input, level) => {
    try {
        const files = fs.readdirSync(input);

        files.forEach(item => {
            let localBase = path.join(input, item);
            let state = fs.statSync(localBase);

            if (state.isDirectory()) {
                sortFiles(localBase, level + 1);
            } else {
                const folderName = item.charAt(0);
                const folderPath = path.join(output, folderName);
                const fileFrom = localBase;
                const fileTo = path.join(folderPath, item);

                fs.mkdir(folderPath, { recursive: true }, (err) => {
                    if (err) throw err;
                    console.log('Directory %s was created', folderName);

                    fs.copyFile(fileFrom, fileTo, (err) => {
                        if (err) throw err;
                        console.log('File %s was copied', item);
                    });
                });
            }
        })
    } catch (e) {
        console.error('outer', e.message);
    }  
}

module.exports = sortFiles;