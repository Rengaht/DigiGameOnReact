const { Server } = require("socket.io");

module.exports.create=function(server){

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
    
    
    
    const game=io.of('/game');
    game.on('connection',(socket) => {
        console.log('user connected to /game');
    
        socket.on('input',(data)=>{
            console.log(`[game03] ${data.id} / ${data.key}`);
            // socket.broadcast.emit('input',data);
        });
    });

    return io;
}