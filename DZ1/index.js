const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'input');
const output = path.join(__dirname, 'output');


const progressInfo = (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
}


const sortFiles = (input, level) => {
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
            fs.copyFile(fileFrom, fileTo, progressInfo);
        });

      }    

    })
  }
  
  sortFiles(input, 0);