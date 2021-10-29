const crypto = require('crypto');
const axios=require('axios');


// botbonnie api secret
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



module.exports.setupBonnie=function(express, app){
    app.use(express.json({ verify: verifyRequest }));
    app.use(abortOnError);


    app.post('/botbonnie',function(req,res){

        // console.log(JSON.stringify(req.body));
        // console.log(JSON.stringify(req.query));


        var input_txt=req.body.userParams.input;
        
        // var message={
        //     "type":"text",
        //     "text":`no response for user_input= ${input_txt}`
        // };
        
        var message=createScoreMessage(req.query.input, req);			
        
        res.json(message);

    });

}

function createScoreMessage(input, req){

    var txt=`LINK`;
	var liff_url=`https://liff.line.me/${process.env.LIFF_ID}`;

	var url=`${liff_url}/${input}?data=${JSON.stringify(req.body.userParams)}&rawId=${req.body.user.rawId}`;

	console.log(url);

	const score_message={
		"type":"text", "text":txt,
		"buttons":[
			{ "title":input, "type":"web_url", "value":url}
		]
	};

    return score_message;
}

module.exports.writeParameterToBonnie=async function writeParameterToBonnie(user){


	
    console.log('get user data='+JSON.stringify(user));
    var data={
        "bot_id":"bot-M-BOieOXZ",
        "bot_pid":"507oftxz",
        "bot_channel":"1",
        ...user
    };
	const url='https://api.botbonnie.com/v1/api/user/params';
	var options={
		url:url,
		method:'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization':`Bearer ${process.env.BOTBONNIE_TOKEN}`,
		},
		data:JSON.stringify(data),
	}

	const resp=await axios(options);
	return resp.data;

}