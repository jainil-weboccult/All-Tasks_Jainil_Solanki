import React from 'react'

const Spreadt = () => {
  let a =[1,2,3,4,5,6,7,8];
  let b=[9,10,11,12,13,14,15,16,17];
  let c:number[];

  let o1={name:"JAS",age:"20"};
  let o2={uni:"nirma",branch:"cse"};
  let o3;
  
  o3={...o1,...o2}
  return (
    <div>

      <h1>{c=[...a,...b]}</h1>
      <h1>{JSON.stringify(o3)}</h1>
    </div>
  )
}

export default Spreadt

