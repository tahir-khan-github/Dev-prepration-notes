//call, apply, bind explicit binding
//these 3 functions will make this keyword to refer to particular object
//also use to tieup a function to an object


//call
var obj = {name: "piyush"}

function helloWorld(a,b){
    return `hello ${this.name} , ${a}, ${b}`
}

console.log(helloWorld.call(obj, 5, "engineer"))

//apply works exactly same it just take multiple args in array

console.log(helloWorld.apply(obj, [5, "engineer"]))

//bind  works exactly same like call but it provides a reusable function as well which we can call later on

const bindFunc = helloWorld.bind(obj)

console.log(bindFunc(24, 50))
console.log(bindFunc("uncle", 50))


//1) what will be output ?
const person = { name: 'Piyush' };

function sayHi(age) {
  return `${this.name} is ${age} years`;
}

console.log(sayHi.call(person, 24));// piyush 24
console.log(sayHi.bind(person, 24));// reusable function

//2) what will be output ?
const age = 10;
var person1 = {
  name: "Piyush",
  age: 20,
  getAge: function(){
    return this.age;
  }
}

var person2 = {age:  24};
person1.getAge.call(person2); // 24
person1.getAge.apply(person2); // 24
person1.getAge.bind(person2)(); // 24

//3) what will be output ?
var status = '😎';

setTimeout(() => {
  const status = '😍';

  const data = {
    status: '🥑',
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());  // this refers to regular function object
  console.log(data.getStatus.call(this));
}, 0);

//data.getStatus.call(this) calls getStatus with this is inside arrow function
//so now getStatus is bound to the global object

//4) write printAnimals() in such a way that it prints all animals in object below

const animals = [
    { species: 'Lion', name: 'King' },
    { species: 'Whale', name: 'Queen' }
  ];
  
  function printAnimals(i) {
      this.print = function() {
        console.log('#' + i + ' ' + this.species
                    + ': ' + this.name);
      }
      this.print();
    }

                                                                                                                                          for (let i = 0; i < animals.length; i++) { // solution explicit bind to each object of an array
                                                                                                                                                  printAnimals.call(animals[i], i)
                                                                                                                                              
                                                                                                                                          }

//5)How to append an array to another array.

const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push(elements); //array.push will push the array instead of elements rather we can do

array.push.apply( elements); //[a,b,0,1,2] elements is an arrayList paased as an argument where it will push each element to the array.

//6)Find min/max in an array and use apply to enhance a built-in function.

const numbers = [5, 6, 2, 3, 7];

let tmp = Math.max(5, 6, 2, 3, 7)
let tmp1 = Math.min(5, 6, 2, 3, 7)

// to use it on array

let max = Math.max.apply(null, numbers); // now it numbers array will be treated as an arguments for function

let min = Math.min.apply(null, numbers); // equal to Math.min 

//7)create a bound function 
function f() {
    console.log( this ); // ?
  }
  
  let user = {
    g: f.bind(null) //it will return another function with context of null ,When user.g() is called, it executes boundFunction, which is essentially f with this bound to null.
  };
  
  user.g(); // window object

  //8)what will be output
  function f1(){
    console.log(this.name);
  }

  f1().bind({name:"abc"}).bind({name:"cde"}) //print abc only as bind chaining not allowed

  //8)
  function checkPassword(success, failed){
 let pass = prompt("password","")
    if(pass ===  "abc") success()
    else failed()
  }

  let userObj  = {
    name: "piyus",
    loginSuccess() {array,
        console.log(`${this.name} logged in`)
    },
    loginfailed() {
        console.log(`${this.name} logged failed`)
    }
  }

  checkPassword(userObj.loginSuccess, userObj.loginfailed)// sending reference of methods which are not bound to userObj and will look into checkpassword
  checkPassword(userObj.loginSuccess.bind(userObj), userObj.loginfailed.bind(userObj))// correct way is to bind


  //Implicit and explicit binding on arrow function doesn't work, it will only look for context of it parent regular function

  let car1 = {
    color: "red",
    company: "ferrary"
  }

  function purchaseCar(currency, price){
        console.log(`${this.company} of ${this.color} has been purchased in ${currency} of ${price}`)
  }

//   purchaseCar.call(car1, "rupees", "41lacks")

  //----------------------pollyfills--------------------------
  
  //call

  //context is an objec, this refers to the function on which call applies so that this starts pointing to context(object)
  Function.prototype.myCall = function (context = {}, ...args){
    if(typeof this !== "function") throw new Error(`${this} is not a function`)

        context.fn = this;
        context.fn(...args)
  }

  purchaseCar.myCall(car1, "rupees", "41lacks")

  //apply
  Function.prototype.myApply = function (context = {}, args=[]){
    if(typeof this !== "function") throw new Error(`${this} is not a function`)
    if(!Array.isArray(args)) throw new Error("args should be an array")

        context.fn = this;
        context.fn(...args)
  }

  purchaseCar.myApply(car1, ["rupees", "41lacks"])

  
  //bind
  Function.prototype.myBind = function (context = {}, ...args){
    if(typeof this !== "function") throw new Error(`${this} is not a function`)

        context.fn = this;
        return function (...newArgs){
            return  context.fn(...args, ...newArgs);
        }


  }

 let boundedFunc = purchaseCar.myBind(car1)
 boundedFunc("rupees", "41lacs")



