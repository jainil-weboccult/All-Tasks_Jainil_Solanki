import React, { ChangeEvent, useRef } from 'react';
import { useState } from 'react'
import Sharedcontext from './Sharedcontext';
export const MyContext = React.createContext(4);

function App() {

  const [common, updateCommon] = useState(0);

  const result= useRef(null);

  function updatecounter(e: ChangeEvent<HTMLInputElement>) {

    updateCommon(parseInt(e.target.value)>0?parseInt(e.target.value) : 0);

  }
  return (
    <>
          <h1>UseContext</h1>
          <input onChange={updatecounter} type="text" name="" id="" />
          <p>Original Value: {common}</p>
        <MyContext.Provider value={common}>
          <Sharedcontext ref={result}/>
        </MyContext.Provider>
      
    </>
  );
}

export default App;
