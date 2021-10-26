var express = require('express');
var app = express();
const port = process.env.PORT || 5000;



// cors
var cors=require('cors');
app.use(cors());
// app.use(express.json({ verify: verifyRequest }));


// socket.io
const http = require('http');
const server = http.createServer(app);
// const server=https.createServer(options,app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{ origin: '*',}
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('message', {'message': 'hello world'});
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(function () {
        // console.log('send second!');
        socket.emit('second', { 'second': new Date().getSeconds() });
    }, 1000);

    socket.on('input',(data)=>{
        console.log(data);
		socket.broadcast.emit('input',data);
    });
});




app.get('/api', function(req, res) {
  res.send('okkkkkk');
});

// app.listen(5000);
server.listen(port, () => console.log(`app listening on port ${port}!`));