import React from "react";
import logo from './todo.png'
import List from "./components/List"
import Search from "./components/Search";

function App() {
  return (
    <div className="App w-full h-full bg-hero-background">
      <div className="flex justify-center align-middle p-60  text-center flex-col">
      <div className="flex items-center gap-2 justify-center">
        <img className="w-10 bg-inherit" src={logo} alt="logo" /><h1 className="text-center font-bold  text-xl text-black"> Todo Application</h1>
      </div>  
      
      <div><List/></div>

      </div>
    </div>
  );
}

export default App;
