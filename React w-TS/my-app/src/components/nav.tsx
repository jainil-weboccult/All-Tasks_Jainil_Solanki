/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
export default function Navbar(): JSX.Element {
    let a: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    interface info  {
        name: string;
        age: number;
    };
    
    const data: info[] = [
        {
            name: "Jainil",
            age: 20,
        },
        {
            name: "Janmey",
            age: 22,
        },
        {
            name: "J",
            age: 21,
        },
    ];
    


    const detail: info={
        name: "Jainil",
        age: 20,
    }


    var {name:nm="Solankis",age:agee=5} = detail;
    console.log(nm,agee);


    
    return (
        <div>
            <h1>Map function using typescript</h1>
            <ul>
                <h1>Map on Array</h1>
                {a.map((item) => {
                    return <li>{item}</li>; //Applied on each element
                })}
            </ul>

            <ul>
                <h1>Map on Object</h1>
                {/* {data.map((data) => (
                    <div >
                        <p>Name: {data.name}</p>
                        <p>Age: {data.age}</p>
                    </div>
                ))} */}


                {
                    data.map((data) => (
                        <><li>{data.name}{data.age}</li></>
                    ))
                }

            </ul>


            <ul>
                <h1>Filtered Array</h1>
                {a.filter((item) => {
                    if (item % 2 == 0) {
                        return <li>{item}</li>; //Returns set after filtering
                    }
                })}
            </ul>
        </div>
    );
}

//Higher Order Functions
// let arr=[1,2,3,4,5,6,7,8,9];

// function filtered(array:number[]) {

//     array.forEach((item) => {

//         if (item % 2 == 0) console.log("Even"+item); 
//     })
// }


// function compute(arr:number[],operator: { (array: number[]): void; (arg0: number[]): void; }) {

//     operator(arr);
// }

// compute(arr,filtered)


type props={
    name: string
}

export function Details(props:props){

    return(
        <h1>Hello <b>{props.name}</b></h1>
    )
}



export function Higherorder(props:props){


    return(
            <>
                {props.name=="Jainil"?<Details name={props.name}/>:"You are not allowed: "+props.name}
            </>        
    )
    
}

