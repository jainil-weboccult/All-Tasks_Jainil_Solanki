// let webURL: string = 'www.blog.e-zest.com';
// webURL = "Jainil Solanki";

//Comments are written her but not in javascript
let webURL: any = 'www.blog.e-zest.com';
webURL = 20;


let details: string = ' \n Welcome to ' + webURL +
    '- articles & blogs by Rupesh Kahane'
console.log(details);

//Arrays 


// let arr :number[]=[1,2,3,4,5,6,7,8,9,10];
// arr.push(11);
// console.log(arr);

// let arr :readonly number[]=[1,2,3,4,5,6,7,8,9,10];
// arr.push(11);//Property 'push' does not exist on type 'readonly number[]'.
// console.log(arr);

//Tuples


// let tup: readonly[string, number,boolean]=["a",2,true];

// tup.push(1); //Property 'push' does not exist on type 'readonly [string, number, boolean]'.
// console.log(tup);


//numeric  enumerator 

enum list {
    one = 5, two, three, four, five
}

let number = list.three;

console.log(number);



//string enumerator


enum slist {
    one = "1", two = "2", three = "3", four = "4", five = "5"
}



console.log(slist.five);



//giving datatypes aliases and custom names

type mynumber = number;
type myname = string;


let num: mynumber = 26;
let namee: myname = "Jainil";

console.log(num + namee);


//interfaces

interface Rectangle {
    height: number,
    width: number
}

interface ColoredRectangle extends Rectangle {
    color: string
}

const coloredRectangle: ColoredRectangle = {
    height: 20,
    width: 10,
    color: "red"
};

console.log(coloredRectangle);


// union types allows the number to be either a number or a string. Value can be more than one type


function dob(input: string | number) {

    console.log(typeof input);
}

dob(2002);
dob("2002");


//functions

function functionwreturn(a: number, b: number): number {
    return a ** b;
}

console.log(functionwreturn(2, 2));



function functionwithoutreturn(a: number, b: number): void {

    console.log("Function without return:" + a + " " + b);

}


functionwithoutreturn(2, 3);



// let userInput: any;

// userInput = "hello world";
// console.log(typeof userInput); // output: "string"

// userInput = 42;
// console.log(typeof userInput); // output: "number"

// // This line will cause a compile-time error
// const username: string = userInput;

// console.log(typeof username);

let userInput: unknown;

userInput = "hello world";
console.log(typeof userInput); // output: "string"

userInput = 42;
console.log(typeof userInput); // output: "number"

// This line will cause a compile-time error
// const username: string = userInput;



