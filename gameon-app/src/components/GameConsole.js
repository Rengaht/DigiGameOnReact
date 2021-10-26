import React, { useEffect, useState } from 'react';
import webSocket from 'socket.io-client';

import { useLiff } from '../liff/LiffProvider';


const ConsolePanel=({sendKey})=>{
    const keys=['A','↑','B','↓','←','→'];
    const onClick=(e, k)=>{
        console.log(k);
        sendKey(k);
    };

    const thekeys=keys.map((k)=>(
        <button className="consoleKey" onClick={(e)=>onClick(e,k)} key={k}>{k}</button>
    ));

    return (
        <div className="consolePanel">
            {thekeys}
        </div>
    );
};

const GameConsole=()=>{

    const {liff, error,ready, profile} = useLiff();
    const [ws, setWs]=useState(null);
    const [message, setMessage]=useState('');

    useEffect(()=>{
        try{
            const ss=webSocket('https://digi-dev.ultracombos.net:5000/');
            setWs(ss);
        }catch(error){
            setMessage(error.toString());
        }
    },[setWs]);

    const initWs=()=>{
        ws.on('second', message_=>{
            // console.log(message_.toString());
            setMessage(`rcv : ${message_.second.toString()}`);
        })
        ws.on("connect", () => {
            console.log('socekt connected!');
            setMessage('ws connected!');
        });
        ws.on("disconnect", () => {
            console.log('socekt disconnected!');
            setMessage('ws disconnected!');
        });
    };
    useEffect(()=>{
        if(ws) initWs();
    },[ws]);

    const sendMessage=(key_)=>{
        if(ws) ws.emit('input',{id: profile.userId, key:key_});
    };

   

    return(
        <div>
            <h1>GAME CONSOLE</h1>
            <h1>輸入代碼</h1>
            <ConsolePanel sendKey={sendMessage}/>        
            <div>ws : {message}</div>    
        </div>
    );
};

export {GameConsole};