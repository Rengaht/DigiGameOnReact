var express = require('express');
var app = express();
const port = 7777;



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
//const http = require('http');
//const server = http.createServer(app);
const server=https.createServer(options,app);
var io = require('./socket').create(server);



const bonnie=require("./botbonnie"); 
bonnie.setupBonnie(express, app);

bonnie.writeParameterToBonnie({
	"bot_id":"bot-M-BOieOXZ",
	"bot_pid":"507oftxz",
	"bot_channel":"1",
	"bot_raw_uid": "Ua5ee453c2a37d2c6b350e914cb982c8b",     
	"params":{
		"game03-score": {
			"value":123
		}
	}
}).then(res=>{
	
	console.log(JSON.stringify(res));

}).catch(err=>{
	console.log(err);
});

// app.get('/game_result', function(req, res) {
  
// 	const result=bonnie.writeParameterToBonnie(req.body);
// 	console.log(result);

// 	res.status(200).json(result);
// });




// app.listen(5000);
server.listen(port, () => console.log(`app listening on port ${port}!`));
