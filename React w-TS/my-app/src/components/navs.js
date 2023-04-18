export default function Navs(){

    const array=[1,2,3,4,5,6,7,8,9,10];

    const info=[{
        name:"a",
    },{name:"b",},{name:"c",}]
   

    
    return(
        <div>
            <h1>Map Function using Javascript</h1>

            <ul>
                <h1>Map on Array</h1>
                {array.map((item) => {
                    return <li>{item}</li>;
                })}
            </ul>

            
            <ul>
                <h1>Map on Object</h1>
                {info.map((item) => {
                    return <li>{item.name}</li>;
                })}
            </ul>
        </div>
    )


}