console.log(abc); //undefined and is hoisted in the global window object
var abc; 

console.log(a);//error but its hoisted in temporal deadzone(time b/w declarataion and intialization of let and const)they are in the scope but not yet decalred
let a;
