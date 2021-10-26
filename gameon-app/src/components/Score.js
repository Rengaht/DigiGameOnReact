import React, { useEffect, useState } from 'react';
import { useLiff } from '../liff/LiffProvider';

const Score=()=>{
    
    const {liff, error,ready, profile} = useLiff();
    const [debug, setDebug]=useState('');    

    useEffect(()=>{
        
        var urlSearchParams=new URLSearchParams(window.location.search);
        var params = Object.fromEntries(urlSearchParams.entries());

        setDebug(params.data.toString());

    },[setDebug]);

    return(
        <div>
            <h1>SCORE</h1>
            <h1>INPUT: {command}</h1>            
            <p className="logText">log: {debug}</p>
        </div>
    );
};

export {Score};