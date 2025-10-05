//1)scope - a region where js variable is recognized
//two types of scope : functinal scope and block scope

//var is functional scope its been from start
{
    var a = 5;
}
console.log(a); // we can acess it outside of block scope

//let and const is block scope and is introduced in es6 and also allowed variable shadowing
{
    let b = 10
    let c = 20
    console.log(a,b)
}

//variable shadowing
function test(){
    let a = "hellow"
    if(true){
        let a = "hi";
        console.log(a);
    }
    console.log(a);
}
test();// var -> let shadowing is allowd but let to var is not allowed and is called as illegal shadowing.

//2)Declaration
"1) redeclaration in the same 'scope' is allowed only for var.  let and const cannot be redeclared in the same 'scope'"
"2) declaration without initialization can be done with var and let but not with const"
"3) re-initialization(updated) can be done with var and let but not with const"

//js exexution context has 2 phases 
//1)creation phase - it creates all the variables and functions in the memory and assign undefined to variable and function to a function
//                   inside a widnow object
//2)execution phase - it executes the code line by line , assign values to variables and execute functions


//3)hoisting -> during creation phase js engine moves variables and functions declaration to top of the code

console.log(abc); //undefined and is hoisted in the global window object
var abc; 

console.log(e);//error but its hoisted in temporal deadzone(time b/w declarataion and intialization of let and const)they are in the scope but not yet decalred
let a;
