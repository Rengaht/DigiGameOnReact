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


app.get('/api', function(req, res) {
  res.send('okkkkkk');
});



// botbonnie api secret
var crypto = require('crypto');
// Express error-handling middleware function.
// Read more: http://expressjs.com/en/guide/error-handling.html
function abortOnError(err, req, res, next){  
	if(err){
		console.log(err);    
		res.status(400).send({ error: "Invalid signature." });
	}else{
		next();
	}
}

// Calculate the X-Hub-Signature header value.
function getSignature(buf) {
	var hmac = crypto.createHmac("sha1", process.env.BOTBONNIE_API_SECRET);
	hmac.update(buf, "utf-8");
	return "sha1=" + hmac.digest("hex");
}

// Verify function compatible with body-parser to retrieve the request payload.
// Read more: https://github.com/expressjs/body-parser#verify
function verifyRequest(req, res, buf, encoding){
	var expected = req.headers['x-hub-signature'];
	if(!expected) return;

	var calculated = getSignature(buf);
	console.log("X-Hub-Signature:", expected, "Content:", "-" + buf.toString('utf8') + "-");

	if(expected !== calculated){
		throw new Error("Invalid signature.");
	}else{
		console.log("Valid signature!");
	}
}


// parser
var bodyParser=require('body-parser');
var jsonParser=bodyParser.json();

app.post('/score',jsonParser,function(req,res){

	console.log(JSON.stringify(req.body));
	console.log(JSON.stringify(req.query));

});


// app.listen(5000);
server.listen(port, () => console.log(`app listening on port ${port}!`));
