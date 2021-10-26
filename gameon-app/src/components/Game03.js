import React, { useEffect, useState } from 'react';
import webSocket from 'socket.io-client';

import { useLiff } from '../liff/LiffProvider';
import { ConsolePanel } from './ConsolePanel';

const Game03=()=>{

    const {liff, error,ready, profile} = useLiff();
    const [ws, setWs]=useState(null);
    const [gamews, setGameWs]=useState(null);
    const [message, setMessage]=useState('');

    const [showConsole, setShowConsole]=useState(false);

    const connectWs=()=>{
        try{
            console.log('connect to socket...');
            const ss=webSocket('https://digi-dev.ultracombos.net:5000/game');

            // const gamess=webSocket('https://digi-dev.ultracombos.net:5000/game',{ forceNew: true });
            
            setWs(ss);
            // setGameWs(gamess);

        }catch(error){
            setMessage(error.toString());
        }
    };

    const initWs=()=>{
        
        ws.on('second', message_=>{
            // console.log(message_.toString());
            setMessage(`rcv : ${message_.second.toString()}`);
        });

        ws.on('result', message_=>{
            // console.log(message_.toString());
            setMessage(`rcv : ${message_.toString()}`);
        });

        ws.on("connect", () => {
            console.log('socekt connected!');
            setMessage('ws connected!');

            
            setShowConsole(true);
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
            <h1>GAME#03 - </h1>
            {!showConsole && <button onClick={connectWs}>進入遊戲</button>}
            {showConsole && <ConsolePanel sendKey={sendMessage}/>}
            
            <div>ws : {message}</div>    
        </div>
    );
};

export {Game03};