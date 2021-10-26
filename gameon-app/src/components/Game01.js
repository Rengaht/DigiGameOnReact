import React, { useEffect, useState } from 'react';
import webSocket from 'socket.io-client';

import { useLiff } from '../liff/LiffProvider';

const Game01=()=>{

    const {liff, error,ready, profile} = useLiff();
    const [message, setMessage]=useState('準備好了嗎?');
    const [showButton, setShowButton]=useState(true);
    const [debug, setDebug]=useState();

    const onClick=()=>{
        setMessage('真正的遊戲 現在才開始');
        setShowButton(false);
        setDebug('獲得徽章');
        
        setTimeout(()=>{
            liff.closeWindow();
        },3000);
    }

    return(
        <div>
            <h1>GAME#01 - Let's Play</h1>

            <h1>{message}</h1>
            {showButton && <button onClick={onClick}>YES</button>}
            <p className="logText">log: {debug}</p>
        </div>
    );
};

export {Game01};