const http = require('http');
const WebSocketServer = require('websocket').server;

const httpserver = http.createServer();

const websocket = new WebSocketServer({httpServer: httpserver});

const connections = [{}];

websocket.on('request', request => {
    const connection = request.accept(null);
    console.log('New Connection');

    connection.on('message', (message) => {
        websocket.broadcast(message.utf8Data);
    });
})

httpserver.listen(4000, () => console.log(`Server is listening on port 4000`));