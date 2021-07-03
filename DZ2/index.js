const server = require('./server');

const DELAY = process.argv[2] !== undefined ? process.argv[2] :1000;
const LIMIT = process.argv[3] !== undefined ? process.argv[3] :10;

const PORT = 3000;

server(DELAY, LIMIT, PORT);