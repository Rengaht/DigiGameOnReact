const { isFunction, isTaggedTemplateExpression } = require('@babel/types');
const GameEvent=require('./GameEvent');
// console.log(JSON.stringify(GameEvent));


class Game03{    

    constructor(name, io){
        console.log(JSON.stringify(GameEvent));
        
        this.GAME_TIME=10000;
        this.MIN_USER=2;
        this.COMMAND="↑↓←→";

        this.name=name;
        this.users=[];        

        this.namespace=io.of(`/${name}`);

        this.listenOnRoom();

        this.playing=false;
        
        this.unity=null;
    }

    listenOnRoom(){
        
        this.namespace.on(GameEvent.Connection,(socket) => {
            
            console.log(`user connected to ${this.name}`);
            socket.emit(GameEvent.Status,{
                players: this.users.length,
            });
            
            socket.on(GameEvent.Register, (data)=>{
               
                var uid=data.uid || "u"+Date.now();

                //TODO: accpet user conditionally
                socket.emit(GameEvent.Accept,{
                    type: GameEvent.Accept,
                    data:{
                        uid:uid
                    }
                });
                
                this.addUser(uid, socket);
                
            });

            socket.on(GameEvent.Input,(data)=>{

                if(!this.playing) return;

                // console.log(`${this.name} input : ${data.uid} / ${data.key}`);
                let user=this.users.find(el => el.uid==data.uid);
                user.input+=data.key;

                console.log(user.input);

                var index_= user.input.indexOf(this.COMMAND);
                // console.log(index_);
                if(index_>-1){

                    user.input=user.input.substring(index_+this.COMMAND.length);

                    console.log("!"+user.input);

                    user.score++;
                    socket.emit(GameEvent.Score,{
                        score: user.score
                    });                    
                }
                

                if(this.unity){
                    this.unity.emit(GameEvent.Input,data);
                    this.unity.emit(GameEvent.Score,{
                        uid:user.uid,
                        score:user.score
                    });
                }

            });
            
            socket.on(GameEvent.Disconnect, () => {
                console.log('user disconnected');

                let index_=this.users.indexOf(el => el.uid==data.uid);
                this.users.splice(index_,1);
            });    


        });    

    }
    addUser(uid, socket){

        if(uid=='unity'){
            if(this.unity!=null) this.unity.disconnect();
            this.unity=socket;
        }

        this.users.push({
            uid:uid,
            socket:socket,
            input:'',
            score:0
        });

        this.updatePlayer();
        
        console.log(`User in ${this.name} = ${this.users.length}`);
        if(this.users.length>=this.MIN_USER) this.startGame();

    }
    updatePlayer(){
        this.roomBroadcast(GameEvent.Status,{
            players: this.users.filter(user=>user.uid!='unity').length,
        });
    }

    roomBroadcast(type,data){

        data={
            type:type,
            ...data
        };

        console.log(`broadcast : [${type}] ${JSON.stringify(data)}`);

        this.namespace.emit(type,data);
    }

    startGame(){

        console.log("//////// START ////////");
        
        this.playing=true;

        this.roomBroadcast(GameEvent.Start,{});



        clearTimeout(this.gameTimer);        
        this.gameTimer=setTimeout(()=>{
            this.endGame();
        },this.GAME_TIME);
    }

    endGame(){

        console.log("//////// END ////////");


        this.playing=false;

        this.roomBroadcast(GameEvent.End,{});

        // this.users.forEach(user=>{
        //     console.log(`${user.uid} / ${user.score}`);
        //     user.socket.emit(GameEvent.Score,{
        //         score: user.score
        //     });
        // });

        

        setTimeout(()=>{
            this.users.forEach(user=>{
                user.socket.disconnect();
            });

        },3000);

        this.users=[];
        
    }


}

module.exports=Game03;