const express = require("express");
const app = express();

const DELAY = 1000;
const LIMIT = 5;
const PORT = 3000;

let connections = [];

app.get("/date", (req, res, next) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked"); // https://en.wikipedia.org/wiki/Chunked_transfer_encoding
  connections.push(res);
});

let tick = 0;
setTimeout(function run() { 
  tick++;

  console.log(tick);
  if (tick >= LIMIT) {

    connections.map(res => {
      res.write("END\n");
      res.end();
    });

    connections = [];
    tick = 0;
  }

  

  setTimeout(run, DELAY);
}, DELAY);

app.listen(PORT, () => {
    console.log(`Server is running on post ${PORT}`);
});