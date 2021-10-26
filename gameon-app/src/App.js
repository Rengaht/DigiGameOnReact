// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';

import { useLiff } from './liff/LiffProvider';

import {Game01} from './components/Game01';
import {Game03} from './components/Game03';

const App= () => {

  const [displayName, setDisplayName] = useState('no profile');
  
  const {liff, error,ready, profile} = useLiff();


  useEffect(() => {
    if(!profile) return;
    
    console.log(profile.userId);
    setDisplayName(`${profile.userId} - ${profile.displayName}`);

  }, [ready,profile]);


  return (
   <div className="container">
      <div className="logText"> LIFF Status = {ready?"Ready":"N"}</div>
      <div className="logText"> User = {displayName}</div>
      <Route path="/Game01" component={Game01}/>
      <Route path="/Game03" component={Game03}/>
    </div>
   
  );
}



export default App;
