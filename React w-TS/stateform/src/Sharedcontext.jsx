import { useContext, useEffect, useRef } from 'react'
import { MyContext } from './App'


import React from 'react'

// export default function Sharedcontext() {



//   const counter= useContext(MyContext)



// // useEffect(()=>{
// //   // result.current=counter+5;
// //   console.log(counter);
// // },[])


// // useEffect(()=>{
// //     // result.current=counter+5;
// //     // console.log(result.current);
// //     console.log(result.current);


// //   },[counter])



//   return (
//     <div>
//         {/* {counter+5} */}

//         {/* <h1 ref={result}>{counter} + 5 = {result.current}</h1> */}


//     </div>
//   )
// }


const Sharedcontext = React.forwardRef((props,ref)=>{

  var counter= useContext(MyContext)

    var reference = ref;
  
    

  useEffect(()=>{

    reference.current.value=`${counter} + 5 = ${counter+5}`;
    
  },[counter, reference])

  return (
    <>
      <input style={{color:"blue", background:"none", border:"none",fontSize:"20px"}} type="text" name="" id="" ref={reference}/>
    </>
  )
});

export default Sharedcontext