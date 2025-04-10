// A basic express server

var express = require('express');
var app = express();

// express-ws
var expressWs = require('express-ws')(app);

// Websocket
app.ws('/', function(ws, req) {
    console.log('Client connected');
    ws.on('message', function(msg) {
        console.log(msg);
        // broadcast to other clients
        for (let client of expressWs.getWss().clients) {
            if (client != ws) {
                client.send(msg);
            }
        }
    });
});


app.get('/', function(req, res) {
    // Send index.html
    res.sendFile(__dirname + '/index.html');
});

app.listen(7002, function() {
    console.log('Example app listening on port 7002!');
});

// open port 3000
// iptables -I INPUT -p tcp --dport 3000 -j ACCEPT