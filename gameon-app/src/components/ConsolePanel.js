import React from 'react';

const ConsolePanel=({sendKey})=>{
    const keys=['A','↑','B','←','↓','→'];
    const onClick=(e, k)=>{
        console.log(k);
        sendKey(k);
    };

    const thekeys=keys.map((k)=>(
        <button className="consoleKey" onClick={(e)=>onClick(e,k)} key={k}>{k}</button>
    ));

    return (
        <div className="consolePanel">
            {thekeys}
        </div>
    );
};

export {ConsolePanel};