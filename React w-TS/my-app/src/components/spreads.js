import React from 'react'

const Spread = () => {
  let a =[1,2,3,4,5,6,7,8];
  let b=[9,10,11,12,13,14,15,16,17];
  let c;

  let o1={name:"JAS",age:"20"};
  let o2={uni:"nirma",branch:"cse"};
  let o3;
  
  o3={...o1,...o2}
  return (
    <div>
      <h1>Spread Operator</h1>
      <h1>Spread with Array</h1>
      <h1>{c=[...a,...b]}</h1>
      <br/>

      <h1>Spread with Objects</h1>
      <h4>{JSON.stringify(o3)}</h4>
      {console.log(o3)}
    </div>
  )
}

export default Spread

