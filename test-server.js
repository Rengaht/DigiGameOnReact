const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const app = express()

const config = {
    channelAccessToken: '3leojDtwVk0QMaU5fvkN4LrknnLLW8pe2gYRNX0Wf7MKFJ9vkr6Icw2dtpW+wOsChtbscMCI0OjpldBbKbGK4Ar1uu/ZBzIjSDwRyo9bCWhtTppbgRNa48b01urrKkPDxKLBPcL+aSFwZ8L8SCs1/gdB04t89/1O/w1cDnyilFU=',
    channelSecret: '7b4c45e3139178c9a9b2ec3dfc3a96cf'
}
const axios = require('axios');
app.post('/webhook',middleware(config),async (req, res) => {

    console.log(req.body);

    const url='https://webhook.botbonnie.com/v1/line/250ggfkx';
	var options={
		url:url,
		method:'POST',
		headers:req.headers,
		data:req.body,
	}
    try{
        const resp=await axios(options);
        res.json(resp);
    }catch(err){
        console.log(err);
        res.json({});
    }
    
})

app.listen(7777)