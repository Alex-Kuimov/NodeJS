const express = require("express");
const app = express();

function toServer(interval){
    return setInterval(function toServer(){
        const now = new Date().toISOString();
        console.log(now);
    }, interval);
}

function toClient(timerId, time, res, server){
    setTimeout(function run() { 
        const now = new Date().toISOString();           
        res.write(`${now}.\n`);
        res.end();
        clearInterval(timerId);
    }, time);
}

const runServer = (time, interval, port) => {

    if (time === undefined || interval === undefined){
        return;
    }

    app.get("/", function (req, res) {
        const timerId = toServer(interval);
        toClient(timerId, time, res, server);
    });

    const server = app.listen(port, () => {
        console.log(`Server is running on post ${port}`);
    });

}

module.exports = runServer;