import React, { useEffect, useState } from 'react';
import webSocket from 'socket.io-client';

import { useLiff } from '../liff/LiffProvider';
import { ConsolePanel } from './ConsolePanel';

import GameEvent from '../../../gameon-server/GameEvent';


const Game03=(props)=>{

    const GameID="game03";

    const {liff, error,ready, profile} = useLiff();
    const [ws, setWs]=useState(null);
    const [message, setMessage]=useState('');

    const [showConsole, setShowConsole]=useState(false);
    // const [uid, setUId]=useState();

    const [score, setScore]=useState(0);
    const [players, setPlayers]=useState(0);
    

    const connectWs=()=>{

        if(ws && ws.connected) return;

        try{
            console.log('connect to socket...');
            const ss=webSocket(`https://digi-dev.ultracombos.net:7777/${GameID}`);
            // const ss=webSocket(`http://localhost:7777/${GameID}`);
            setWs(ss);
            // setGameWs(gamess);

        }catch(error){
            setMessage(error.toString());
        }
    };

    const initWs=()=>{
        
        ws.on(GameEvent.Start, message_=>{
            console.log(JSON.stringify(message_));
            setMessage('Start');
            
        });

        ws.on(GameEvent.End, message_=>{
            console.log(JSON.stringify(message_));
            setMessage('End!');
            setShowConsole(false);

            liff.sendMessages([{
                'type': 'text',
                'text': "看分數"
            }]).then(function() {
                liff.closeWindow();
            }).catch(function(error) {
                window.alert('Error sending message: ' + error);
            });

        });

        ws.on(GameEvent.Status, message_=>{
            console.log(JSON.stringify(message_));

            setPlayers(message_.data);
        });

        ws.on(GameEvent.Score, message_=>{
            console.log(JSON.stringify(message_));
            setScore(message_.data);

        });

        ws.on(GameEvent.Connect, () => {
            console.log('socekt connected!');
            setMessage('connected!');
            setShowConsole(false);
            
        });
        ws.on(GameEvent.Disconnect, () => {
            console.log('socekt disconnected!');
            setMessage('disconnected!');

            setShowConsole(false);
            setScore(0);
        });

        ws.on(GameEvent.Accept, message_=>{
            console.log(JSON.stringify(message_));
            setMessage("Joined !");
            setShowConsole(true);

            // setUId(message_.data.uid);
            setScore(0);
        });
    };

    

    // auto connect
    useEffect(()=>{
        
        connectWs();
    },[setWs]);

    useEffect(()=>{
        if(ws) initWs();
    },[ws]);

    const joinGame=()=>{
        ws.emit(GameEvent.Register,{
            uid:props.rawId,            
        });
    };
    const sendMessage=(key_)=>{
        if(ws) ws.emit(GameEvent.Input, {
            uid: props.rawId,
            data:key_
        });
    };

   

    return(
        <div>
            <h1>GAME#03 - </h1>
            <h1>{players} PLAYERS JOINED</h1>
            
            {(!ws?.connected) && <button onClick={connectWs}>connect</button>}
            
            {!showConsole && <button onClick={joinGame}>進入遊戲</button>}
            {showConsole &&<ConsolePanel sendKey={sendMessage}/>}

            <h1>{message}</h1>
            <h1> score= {score}</h1>

            
            {/* <div>ws : {message}</div>     */}
        </div>
    );
};

export {Game03};