//functions

//funtion expression - storing func inside a variable
const square = function(num){ 
    return num * num;
}

console.log(square(5));

//first class functions - language where func is treated as variable , it can do all the things which a variable can do
function square1(num){ 
    return num * num;
}

function displayName(fn){
    console.log("first class function ",fn(5)) // we pass them in another fn just like a variable and can be modified and returned
}

displayName(square1); 

//IIFE - immediately invoked fn expression :-
(function square2(num){ 
    console.log(num * num);
})(5);

//output based ? :-
(function (x) {
    return (function (y){
        console.log(x); // this will not print undefined although x is not in scope, bcoz it will try to find x in the parent scope becoz of closure
    })(2);
})(1); //closures - ability of fn to acess variable and fn which are lexically outside of its scope & closures are created whenever new function is created


//function scope:-
for(let i = 0; i < 5 ; i++){
    setTimeout(() => {
        console.log(i) // let will print 0 to 4 bcz for every iteration new block scope will be created as let is a block scope
    }, 1000);
}

//let has block scope. This means that for each iteration of the loop, a new binding of i is created.
//When the setTimeout callback is executed after 1000ms, it references the i value from the respective iteration when the setTimeout was created

//var has function scope (or global scope if not in a function). This means that the same binding of i is used across all iterations of the loop.
//By the time the setTimeout callbacks execute after 1000ms, the loop has already completed, and i has the value 5.


//function hoisting
fnHoisting();

function fnHoisting(){
    console.log("function hoisting") // it will give result becoz function is hoisted fully with its block, not like variable which give undefined
}

//function hoisting o/p based ?

var x = 21;

var fun = function(){
    console.log(x);// undefined bcz it seperate execution context for that fn / local scope
    var x = 20;
}

fun();

//parm = rest  vs  args = spread
function mul(...arr){ //res  parameters needs to be last in declaration
    console.log(arr);
}

var arr = [1,2];

mul(...arr); 

//call back fn - fn passed into another fn to perform some action

function square4(num){ 
    return num * num;
}

function displayName(fn){
    console.log("call back function ",fn(5))
}

displayName(square1); 


//arrow fn - introduces in es6

//arrow fn vs normal fn
//1)syntax is different
//2)implicit return if one liner
//3)arguments keywork is accessible in normal fn and not in arrow
function normal(){ 
    console.log(arguments);
}
normal(1,2,3);
//4)this keyword
//this in normal fn points to current obj (current object of the function)
//this in arrow fn points to global obj(parent function of the arrow function)