var express = require('express');
var app = express();
const port = process.env.PORT || 5000;



// cors
var cors=require('cors');
app.use(cors());
// app.use(express.json({ verify: verifyRequest }));


// ssl
const https=require('https');
const fs=require('fs');

var options={
	key:fs.readFileSync('ssl-keys/privkey1.pem'),
	cert:fs.readFileSync('ssl-keys/fullchain1.pem'),
};


// socket.io
// const http = require('http');
// const server = http.createServer(app);
const server=https.createServer(options,app);
// const { Server } = require("socket.io");

var io = require('./socket').create(server);


app.get('/api', function(req, res) {
  res.send('okkkkkk');
});

// app.listen(5000);
server.listen(port, () => console.log(`app listening on port ${port}!`));