const { Server } = require("socket.io");
const Game03=require('./gameon-server/game03');

module.exports.create=function(server){

    console.log('create server...');

    const io = new Server(server,{
        cors:{ origin: '*',}
    });
    
    io.on('connection', (socket) => {
        console.log('a user connected to main');
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
    
    const game03=new Game03('game03',io);

    
    return io;
}
