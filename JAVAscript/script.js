// let js="Cool";
// if(js=="Cool") alert("JS is Fun");

// console.log(20+22);

// var ns;
// const gd="hello";
// gd=23;
// console.log(gd)

// single line comment 

/* multi
line comment
*/
// Naming Variable Convention 
// 1)cameCase firstName 
// 2)do not start with number,can start with _ or $
// let 6js='hello'; X
// 3) variable can contain number,letter,_ and $
// 4) cannot be a reserved keyword
// let this='hhh' X
// 5)Should not start with Uppercase
// let Js='hhjh' ; X
// 6)constants should always be in uppercase
// const PI = 3.1
// 7)descriptive

// Data types 
// objects and premitive

// object 
// let js = {
//     describe : 'Fun'
// };

// Primitive data Types 
// 1)Number 
let age=19;
// 2)String
let job1 = "Computer Programmer";
console.log('Hello World "Yoo"');
// 3)Boolean
const TEACH =false;
console.log(typeof TEACH);
// 4)Undefined
let firstName = "Katha";
console.log(firstName);
console.log(typeof firstName);
// 5)Null: empty value
// 6)Symbol (ES2015)
// 7)BigInt (ES2020)

// dynamic typing

// console.log(typeof null)

firstName = "Das";
console.log(firstName); //variable mutation

// Basic operators 

// math operators + - * / %
//Assignment oerators = +=
let number1 = 1;
number1 += 3 //number1 = number1 + 3
console.log(number1)

// Comparision operator > < >= <=
// y=x= 25-(3+5-3)*4

// If-else statement 
// If(con1){
//     task1
// }else{
//     task2
// }

// const value=3;
// const isItRaining = true;
// if(!(isItRaining)){
//     console.log("Carry Chatta");
// }
// else if(value ==3){
//     console.log('the number is 3');
// }
// else{
//     console.log("ayse hi jao");
// }

// Type Conversion and Coercion
console.log('23'+3);
// console.log(typeof('23'+3));
console.log('23'-3);
// console.log(typeof('23'-3));

// let year='2023';
// year=Number(year);
// console.log(typeof(year));
// console.log(Number(year));
// console.log(typeof(year));

// const firstName = 'Katha'
// const nameNumber = Number(firstName);
// console.log(nameNumber);
// NaN = Not a Number
// console.log(typeof(nameNumber))
// const NUM = 23;
// const stringNum = String(NUM);
// console.log(stringNum)

// const Name1 = prompt("Say your name");

// if(Name1 ==1){
//     alert("tapabrata is a good person.");
// }
// else if(Name1 ==2){
//      alert("samrat is a good person.");
// }
// else{
//     alert("What the hell is this!!");
// }

// const Name1 = prompt("Say your name");

// if(Number(Name1) === 1){
//     alert("tapabrata is a good person.");
// }
// else if(Number(Name1) === 2){
//      alert("samrat is a good person.");
// }
// else{
//     alert("What the hell is this!!");
// }

//Truthy & Falsy value

const name1 = "";
console.log(Boolean(name1))

// 0 ,'',undefined,Null,NaN

// Logical Operators = && || !
// loose operators: == , !=
// strict operators: === , !==

// const Day = prompt("What week-day is today?");

// if(Day === 'monday'){
//     alert("GO,Study:)");
// }
// else if(Day === 'tuesday' || Day === 'wednesday'){
//     alert("Party Time!");
// }
// else if(Day === 'thursday' || Day === 'friday'){
//     alert("So jaooo");
// }
// else{
//     alert("Jee loo apni zindagi");
// }

// Statements & Expressions
// 2+3
// 2000
// true && false
// if(3>1){
//     console.log("big")
// }

// firstName = 'Katha'
// age = 2023 - 2004
// let drink;
// if(age>=18){
//     drink = 'Coke'
// }
// else{
//     drink = 'Frootie'
// }
// console.log('My name is'${firstName} and I am ${age} year old,I drink ${drink});

 // Ternary operator

// const drink = age>=18? 'Coke' : 'milk';
// console.log('My name is'${firstName} and I am ${age} year old,I drink ${age>=18? 'Coke' : 'milk'});

// let age=19;
// let college = true;
// console.log(age>=18 && college? "wine":"milk")


//Strict Mode
'use strict'
let driverLicense = false;
const passTest = true;

if(passTest) driverLicense = true;
if (driverLicense) console.log("I can drive");


//-------------------------------------------------------------------

/*
//~ Calling Function 

function birthYear(current_year, birth_year) {
    console.log(current_year - birth_year)
}
birthYear(2023, 2004);
*/

//-------------------------------------------------------------------

/*
//Function Declaration

function calcAge(birthYear){
    return 2023- birthYear
}

console.log(calcAge(2000));

function expression

const calcAge2 = function(birth_year){
    return 2023- birth_year;
}

console.log(calcAge2(2000));
*/

//-------------------------------------------------------------------

/*
//Arrow functions
const calcAge3 = birthYear => 2023 - birthYear;

let age = calcAge3(2000);
console.log(age);

//'this' keyword that cannot be used in arrow function

*/

//-------------------------------------------------------------------

/*
//Calling function inside function

  const juice = (apple, banana) =>{
    
    let cut_apple = cutting(apple, 4);
    let cut_banana = cutting(banana, 3);    
    
    console.log(juice with ${cut_apple} pieces of apple and ${cut_banana} pieces of banana);
} 
const cutting = (fruit, pieces) =>  fruit * pieces;

juice(5, 3);

*/
//Arrays
// const friend1 = "Ghum"
// const friend2 = "Pachche"
// const friend3 = "Khub"

// const friends = ["Ghum" , "Pachche" , "Khub"];
// console.log(friends);
// //2nd way 
// const years = new Array(2000,2001,2002,2003,2004);
// console.log(years);

// console.log(friends[1]);
// console.log(friends.length);
// console.log(friends[friends.length-1]); 

// friends[1] = "pachche na" ; //array is a primitive value 
// console.log(friends);

// const firstName1 = "Kathakali" ;
// const kathakali = [firstName1,"Das",2023-2004,friends];
// console.log(kathakali.length);
// console.log(kathakali[2]);
// console.log(kathakali[0]);
// console.log(kathakali[3]);

// const friends = ["Ghum" , "Pachche" , "Khub"];
// friends.push("ekhon r");
// console.log(friends);
// const newLength = friends.push("pachche","na");
// console.log(newLength);
// console.log(friends);

// const what = friends.unshift("Amar");
// console.log(friends);
// console.log(what);

// const what2 = friends.pop();
// console.log(friends);
// console.log(what2);

// const what3 = friends.pop();
// console.log(what3);

// friends.shift();
// console.log(friends);

// console.log(friends.indexOf("Ghum"));
// console.log(friends.indexOf("Sooraj"));

// const kathakali = [friends,"Das",2023-2004];
// console.log(kathakali.includes("19")); //it'll strictly check the datatype.

// //Objects - keyValue Pair
// const moodyObject = {
//     firstName: 'Kathakali' ,
//     lastName: 'Das' ,
//     birthYear: 2004 ,
//     friends: ["Don't","ever","have","siblings"] ,
//     calcAge: function(){
//         this.age = 2023 - this.birthYear ;
//         console.log(this); //if we call 'this' the it'll point the object.
//         return this.age ;
//     },
// };

// //dot vs bracket notation
// console.log(moodyObject.lastName);

// console.log(moodyObject["lastName"]);

// const nameKey = "Name" ;
// console.log(moodyObject["last"+nameKey]);

// // console.log(moodyObject."last"+nameKey);
// // console.log(moodyObject.last + nameKey);

// const kathakali = ["Das",2023-2004];
// kathakali.push(moodyObject);
// console.log(kathakali);

// moodyObject.location = "India" ;
// moodyObject["email"] = "Kd2004@gmail.com";
// console.log(moodyObject);

// // console.log(moodyObject["calcAge"](2000));
// console.log(moodyObject["calcAge"]());

