import React, { useState } from 'react';
import { ConsolePanel } from './ConsolePanel';


import { useLiff } from '../liff/LiffProvider';

const GameConsole=()=>{
    
    const {liff, error,ready, profile} = useLiff();
    const [debug, setDebug]=useState('');
    const [command, setCommand]=useState('');

    const addCommand=(k)=>{
        setCommand(command+k);
    }
    const ClearCommand=()=>{
        setCommand('');
    };
    const SendCommand=()=>{
        setDebug(`sending cmd = ${command}`);
        setTimeout(()=>{
            liff.closeWindow();
        },3000);
    }; 


    return(
        <div>
            <h1>GAME CONSOLE</h1>
            <h1>INPUT: {command}</h1>
            <ConsolePanel sendKey={addCommand}/>
            <button onClick={SendCommand}>SEND</button>
            <button onClick={ClearCommand}>CLEAR</button>
            <p className="logText">log: {debug}</p>
        </div>
    );
};

export {GameConsole};