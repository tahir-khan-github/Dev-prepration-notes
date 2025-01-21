//what is currying
//Currying is a function that takes one argument at a time and returns a new function expecting the next argument.

//convert below to curring
function f(a,b,c) {
    return a + b + c;
}

console.log(f(1,2,3));

function f1(a) {
    return function(b){
        return function(c){
            return a + b + c;
        }
    }
}

console.log(f1(1)(2)(3));

//Why should currying be used?
//It makes a function pure which makes it expose to less errors and side effects.
//It helps in avoiding the same variable again and again.
//It divides one function into multiple functions so that one handles one set of responsibility.


//It divides one function into multiple functions so that one handles one set of responsibility.?

function evaluate(operation){
    return function(a){
        return function(b){
            if(operation === "sum") return a + b;
            else if(operation === "subtract") return a - b;
            else if(operation === "multiply") return a * b;
            else if(operation === "devide") return a/b;
        }
    }
}

console.log(evaluate("sum")(1)(2));
console.log(evaluate("subtract")(1)(2));
console.log(evaluate("multiply")(1)(2));
console.log(evaluate("devide")(1)(2));

console.log(evaluate("sum")); //function(a),(b)

//write infinite currying

function add(a){
    return function(b){
        return function(){
            return a + b;
        }
    }
}

console.log(add(3)(4)());

                                                                                                                                                    function add(a){
                                                                                                                                                        return function(b){
                                                                                                                                                            if(b) return add(a+b);
                                                                                                                                                            else return a;
                                                                                                                                                        }
                                                                                                                                                    }

console.log(add(3)(4)(7)(7)());

//Currying vs Partial application

//currying
// function f1(a) {
//     return function(b){
//         return function(c){
//             return a + b + c;
//         }
//     }
// }

//Partial application
// function f1(a) {
//     return function(b,c){
//             return a + b + c;
//     }
// }

//Partial application transforms a function into another function with smaller arity.
 

 //Write a function curry() that converts f(a,b,c) into a curried function f(a)(b)(c) .(args.length >= func.length)
 
                                                                                                                                                        function curry(func){
                                                                                                                                                            return function curriedFunc(...args){
                                                                                                                                                                if(args.length >= func.length){ // curry have equal number of arguments and function
                                                                                                                                                                        return func(...args)
                                                                                                                                                                }else{
                                                                                                                                                                    return function (...next){
                                                                                                                                                                        return curriedFunc(...args, ...next)
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            };
                                                                                                                                                        }

const sum = (a,b,c,d)=> a+b+c+d;

const totalSum = curry(sum);

console.log(totalSum(1)(2)(3)(4))

