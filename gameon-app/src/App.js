// import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';

import { useLiff } from './liff/LiffProvider';

import {GameConsole} from './components/GameConsole';

// import { LiffConsumer } from 'react-liff';

import dotenv from 'dotenv';

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
      <div> LIFF Status = {ready?"Ready":"N"}</div>
      <div> User = {displayName}</div>
      <Route path="/console" component={GameConsole}/>      
    </div>
   
  );
}



export default App;
