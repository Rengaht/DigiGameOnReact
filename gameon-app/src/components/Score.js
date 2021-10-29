import React, { useEffect, useState } from 'react';
import { useLiff } from '../liff/LiffProvider';

const Score=(props)=>{
    
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
            <p className="logText">log: {debug}</p>
            <p>Botbonnie rawId {props.rawId}</p>            
        </div>
    );
};

export {Score};