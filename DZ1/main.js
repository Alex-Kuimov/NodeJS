const path = require('path');
const sortFiles = require('./sort');

const input = path.join(__dirname, 'input');
  
sortFiles(input, 0);