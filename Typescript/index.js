// let webURL: string = 'www.blog.e-zest.com';
// webURL = "Jainil Solanki";
//Comments are written her but not in javascript
var webURL = 'www.blog.e-zest.com';
webURL = 20;
var details = ' \n Welcome to ' + webURL +
    '- articles & blogs by Rupesh Kahane';
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
var list;
(function (list) {
    list[list["one"] = 5] = "one";
    list[list["two"] = 6] = "two";
    list[list["three"] = 7] = "three";
    list[list["four"] = 8] = "four";
    list[list["five"] = 9] = "five";
})(list || (list = {}));
var number = list.three;
console.log(number);
//string enumerator
var slist;
(function (slist) {
    slist["one"] = "1";
    slist["two"] = "2";
    slist["three"] = "3";
    slist["four"] = "4";
    slist["five"] = "5";
})(slist || (slist = {}));
console.log(slist.five);
var num = 26;
var namee = "Jainil";
console.log(num + namee);
var coloredRectangle = {
    height: 20,
    width: 10,
    color: "red"
};
console.log(coloredRectangle);
// union types allows the number to be either a number or a string. Value can be more than one type
function dob(input) {
    console.log(typeof input);
}
dob(2002);
dob("2002");
//functions
function functionwreturn(a, b) {
    return Math.pow(a, b);
}
console.log(functionwreturn(2, 2));
function functionwithoutreturn(a, b) {
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
var userInput;
userInput = "hello world";
console.log(typeof userInput); // output: "string"
userInput = 42;
console.log(typeof userInput); // output: "number"
// This line will cause a compile-time error
// const username: string = userInput;
