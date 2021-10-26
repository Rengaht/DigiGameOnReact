import React, { useEffect, useState } from 'react';
import liff from '@line/liff';


const LiffContext=React.createContext(null);

export const LiffProvider=(({liffId, children})=>{

    const [lliff, setLiff]=useState();
    const [error, setError]=useState();
    const [ready, setReady]=useState();    
    const [profile, setProfile]=useState();

    useEffect(()=>{
        (async () => {      
            console.log('init liff...');
            try{
                await liff.init({
                    liffId:liffId
                });          
                console.log(`liff initialized ! ${liffId}`);
                
                setLiff(liff);
                setReady(true);
                // setIsLoggedIn(liff.isLoggedIn());

            }catch(err){
                console.log(err);        
                setReady(false);
                setError(err);
            }
        })();
    },[]);

    useEffect(()=>{
        
        if(!ready) return;

        (async () => {
        
            console.log('get profile...');
            
            const profile = await liff.getProfile();
            setProfile(profile);
            
        })();
    },[liff,ready]);

    const LoggedInButton=()=>{
        if(!ready) return null;

        if(!liff.isLoggedIn()) return <button onClick={liff.login}>Login</button>;
        return null;
    };
    

    return(
        <LiffContext.Provider value={{liff, error, ready, profile }}>
            {LoggedInButton()}
            {children}
        </LiffContext.Provider>
    );

});

export const useLiff=()=>React.useContext(LiffContext);
