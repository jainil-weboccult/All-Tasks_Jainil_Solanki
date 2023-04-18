import React, { useEffect, useState } from "react";
import back from "./assets/question.svg";
import card1 from "./assets/card1.jpg";
import card2 from "./assets/card2.jpg";
import card3 from "./assets/card3.jpg";
import card4 from "./assets/card4.jpg";
import card5 from "./assets/card5.jpg";
import card6 from "./assets/card6.jpg";
import card7 from "./assets/card7.jpg";
import card8 from "./assets/card8.jpg";
import card9 from "./assets/card9.jpg";
import card10 from "./assets/card10.jpg";


function App() {
  const cards = document.querySelectorAll(".memory-card");
  const [cardstate,setCardState] =useState("null");
  
  
  var sindex=cardstate
useEffect(()=>{
  cards.forEach((card,index)=>{
    if(index===sindex){
      card.classList.toggle("flip");
    }
  })
  

},[cardstate]);

  cards.forEach((card,index) => card.addEventListener("click",()=>{ setCardState(index);  }));

  return (
    <div>
      <div className="memory-game">
        <div className="memory-card">
          <img className="front-face" src={card1} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card2} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card1} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card2} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card3} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card4} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card3} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card4} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card5} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card6} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card5} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
        <div className="memory-card">
          <img className="front-face" src={card6} alt="React" />
          <img className="back-face" src={back} alt="Memory Card" />
        </div>
      </div>

      
    </div>
  );
}

export default App;
