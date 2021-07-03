const express = require("express");
const app = express();

const server = (DELAY, LIMIT, PORT) => {

    let connections = [];

    app.get("/date", (req, res, next) => {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        connections.push(res);
    });


    let tick = 0;
    setTimeout(function run() { 
    
        const now = new Date();

        console.log(now);

        if (++tick > LIMIT) {

            connections.map(res => {
                res.write(`${now}.\n`);
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

}

module.exports = server;