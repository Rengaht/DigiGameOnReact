// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';

import { useLiff } from './liff/LiffProvider';

import {Game01} from './components/Game01';
import {Game03} from './components/Game03';
import {GameConsole} from './components/GameConsole';
import {Score} from './components/Score';

const App= () => {

  const [displayName, setDisplayName] = useState('no profile');
  const [rawId, setRawId]=useState();
  const {liff, error,ready, profile} = useLiff();
  

  useEffect(() => {
    
    var urlSearchParams=new URLSearchParams(window.location.search);
    var params = Object.fromEntries(urlSearchParams.entries()) || `u${Date.now()}`;
    setRawId(params.rawId);
    console.log(JSON.stringify(params));

    if(!profile) return;
    
    console.log(profile.userId);
    setDisplayName(`${profile.userId} - ${profile.displayName}`);

  }, [ready,profile]);


  return (
   <div className="container">
      <div className="logText"> LIFF Status = {ready?"Ready":"N"}</div>
      <div className="logText"> User = {displayName}</div>
      <Route path="/game01" component={(props)=> <Game01 rawId={rawId}/> } />
      <Route path="/game03" component={(props)=> <Game03 rawId={rawId}/> } />
      <Route path="/console" component={(props)=> <GameConsole rawId={rawId}/> } />
      <Route path="/score" component={(props)=> <Score rawId={rawId}/> } />
    </div>
   
  );
}



export default App;
