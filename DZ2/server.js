const express = require("express");
const app = express();

const runServer = (delay, limit, port) => {

    if (delay === undefined || limit === undefined){
        return;
    }

    let connections = [];

    app.get("/date", (req, res, next) => {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        connections.push(res);
    });

    const server = app.listen(port, () => {
        console.log(`Server is running on post ${port}`);
    });


    let tick = 0;
    setTimeout(function run() { 
    
        const now = new Date();

        console.log(now);

        if (++tick > limit) {

            connections.map(res => {
                res.write(`${now}.\n`);
                res.end();
            });

            connections = [];
            tick = 0;
            server.close();
        } else {
            setTimeout(run, delay);
        }

    }, delay);

}

module.exports = runServer;