const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const {createServer} = require("http");
const server = http.createServer(app);
const httpServer = createServer(app);
const io = require('socket.io')(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
let isConnected = false
io.on('connection', (socket) => {
    isConnected = socket.connected
    console.log('connection s');

    socket.on("message", (arg, callback) => {
        socket.broadcast.emit('message', arg)
        socket.emit('message', arg)
    })

    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
})

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running ${port}`);
});