//what is closure?

//closures ->combination of functions bundle together with references to its lexical environment
 // it gives access to outer function scope from inner function
function outerFun(){
    var name = "outer fun name"
    function innerFun(){
        console.log(name);
    }
    return innerFun;
}
var myFun = outerFun();
myFun();

//what is closure scope chain?
//inner function will access to its outer function scope as well as scope of parent of outer function
var parentName = "parent name"
function outerFun1(){
    var name = "outer fun name"
    function innerFun1(){
        console.log(name,parentName);
    }
    return innerFun1;
}
var myFun1 = outerFun1();
myFun1();

function makeFun(){
    let name = "abcd";
    function dipName(num){
        console.log(name, num);
    }
    return dipName;
}
makeFun()(5);

// global scope
const ef = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + ef;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20



//------------------output based------------------------------

let count = 0;

function printCount(){
    if(count == 0){
        let count = 1;
        console.log(count);                                                                                                             // 1 beocz of variable shadowing
    }

    console.log(count);                                                                                                                  // 0 because of closure
}

//--------------------------
//write a function to create base
                                                                                                                                                function createBase(a){
                                                                                                                                                    function helper(b){
                                                                                                                                                        console.log(a + b);
                                                                                                                                                    }

                                                                                                                                                    return helper;
                                                                                                                                                }

var addSix = createBase(6); //that can do this
addSix(10) //16;
addSix(21) //27

//---------------------------
//time optimization

function find(idx){
    let a = [];
    for(let i = 0 ; i < 1000000; i++){
        a[i] = i * i;
    }

    console.log(a[idx]); 
}
console.time("6");
find(6);
console.timeEnd("6");
console.time("12");
find(12);
console.timeEnd("12");
                                                                                                                                            //optimized1
                                                                                                                                            function find1(){
                                                                                                                                                let a = [];
                                                                                                                                                for(let i = 0 ; i < 1000000; i++){
                                                                                                                                                    a[i] = i * i;
                                                                                                                                                }

                                                                                                                                                return function(idx){
                                                                                                                                                    console.log(a[idx]);
                                                                                                                                                }
                                                                                                                                            }

                                                                                                                                            var closure = find1(); // here find function will only called once because it returned closure , and now we can use only that closure to find array value
                                                                                                                                            console.time("6");
                                                                                                                                            closure(6)
                                                                                                                                            console.timeEnd("6");
                                                                                                                                            console.time("12");
                                                                                                                                            closure(12);
                                                                                                                                            console.timeEnd("12");

//------block scope and settime out ----important---

function a(){
    for(var i = 0 ; i < 3 ; i++){
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    }
}
a(); // 3 3 3 becoz var is functional scope and not block scope


//printing like let variable using 0 1 2 closure 

function c(){
    for(var i = 0 ; i < 3 ; i++){
        function innerFun(i){
            setTimeout(() => {
                console.log(i);
            }, i * 1000);
        }

        innerFun(i);
    }
}
c();// 0, 1 ,2 every time new func block has been created and for every block i becomes it local variable which will have
        // seperate val for seperate block

        

//-------------------------------------------------------------
//how to use closure to create private counter == counter can be moidfied without acessing it

                                                                                                                                                function privateCounter(){
                                                                                                                                                    var _counter = 0;

                                                                                                                                                    function add(num){
                                                                                                                                                        _counter += num;
                                                                                                                                                    }

                                                                                                                                                    function retrieve(){
                                                                                                                                                        return "counter - > "+ _counter;
                                                                                                                                                    }

                                                                                                                                                    return {
                                                                                                                                                        add,
                                                                                                                                                        retrieve
                                                                                                                                                    }
                                                                                                                                                }

const e = privateCounter();
e.add(5);
e.add(10);
console.log(e.retrieve());

// what is module pattern? 
// a way of using private function without acessing it like above

                                                                                                                                                function modulePattern(){
                                                                                                                                                    function privateFun(value){
                                                                                                                                                        console.log("private function", value)
                                                                                                                                                    }

                                                                                                                                                    return {
                                                                                                                                                        publicMethod: function(a){
                                                                                                                                                            privateFun(a);
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }

var f = modulePattern();
f.publicMethod(10);

//how to run funtion only once 
//we can write polyfill of once

                                                                                                                                            function once(func, context){
                                                                                                                                                let ran;
                                                                                                                                                    return function(){
                                                                                                                                                        if(func){
                                                                                                                                                            ran = func.apply(context || this, arguments);
                                                                                                                                                            func = null;
                                                                                                                                                        }

                                                                                                                                                        return ran;
                                                                                                                                                    }
                                                                                                                                            }

 const hello = once((a,b)=> console.log("hello",a,b));
 hello(1,2);
 hello(1,2);
 hello(1,2);

 //implement caching or memoize

 function complexMultiply(num1, num2){
    for(let i = 0 ; i < 1000000 ; i++){}

    return num1 * num2;
 }

 console.time("first call")
 console.log(complexMultiply(1500,1500));
 console.timeEnd("first call");
 console.time("second call")
 console.log(complexMultiply(1500,1500));
 console.timeEnd("second call");

                                                                                                                                            function caching(fn, context){
                                                                                                                                                let cache = {};
                                                                                                                                                return function(...args){
                                                                                                                                                    let values = JSON.stringify(args);
                                                                                                                                                    if(!cache[values]){
                                                                                                                                                        cache[values] = fn.call(context || this, ...args);
                                                                                                                                                    }

                                                                                                                                                    return cache[values];
                                                                                                                                                }
                                                                                                                                            }

let cachingFunction = caching(complexMultiply)
 console.time("first call")
 console.log(cachingFunction(1500,1500));
 console.timeEnd("first call");
 console.time("second call")
 console.log(cachingFunction(1500,1500));
 console.timeEnd("second call");

 //what is diff b/w closure and scope
 //closure -> as above
 //scope -> defines what variable you have acess to



