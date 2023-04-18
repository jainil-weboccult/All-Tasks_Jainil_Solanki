/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Navbar from './components/nav';
import Navs from './components/navs';
import Spread from './components/spreads';
import Spreadt from './components/spreadst';
import { Higherorder } from './components/nav';


function App() {
  return (
    <div className="App">
        <Navbar/>
        {/* <Navs/>  */}
        {/* <Spread/> */}
        {/* <Spreadt/> */}
        
        <Higherorder name='Jainil'/> 
    </div>
  );
}

export default App;
