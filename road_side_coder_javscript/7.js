//The value of this is determined by how a function is called 
//So, there are two types of binding when it comes to object binding in JS, one is implicit and other is explicit.
//Implicit Binding is applied when you invoke a function in an Object using the dot notation. 
//this in such scenarios will point to the object using which the function was invoked. 
//In Explicit Binding, you can force a function to use a certain object as its this. 
//Explicit Binding can be applied using call(), apply(), and bind().


//Explain ‘this’ keyword?
// in the JavaScript language, the ‘this’ keyword is used to reference something — an object!

//behaviour
//1)inside a function in window obj
function myFunction() {
    console.log(this)
}
myFunction(); // window object is calling this function
//In it, this points to the owner/parent object of the function call

//2)inside a function of obj
let user = {
    name: "Piyush",
    age: 24,
      getDetails() {
          console.log(this.name); //Piyush
      }
  };
///In it, this points to the parent object of the function .

//3)inside a function of child obj
let user1 = {
    name: "Piyush",
    age: 24,
      childObj:{
          newName:"Roadside Coder",
          getDetails() {
              console.log(this.newName, "and" ,this.name);
          }
      }
  };/////In it, this points to the parent obkject of the function which is childObj.


//4) arraow func inside obj
let user2 = {
    name: "Piyush",
    age: 24,
      getDetails: () => {
          console.log(this.name); 
      }
  };// here this will points to window obj becoz this keyword value will come from the parent function of the arrow function and parent doesn/t excist
    //this will take the value from its parent function which is window object 


  //5) arrow inside a func
  let user3 = {
    name: "Piyush",
    age: 24,
      getDetails() {
          const nestedArrow = () => console.log(this.name); //Piyush
          nestedArrow();
      }
  }//becoz this keyword value is coming from the parent function of the arrow function and parent is using objects value

  //6)inside class/constructor
  class user4 {
    constructor(n){
        this.name = n
    }
    getName(){
        console.log(this.name); //this points to varaible of constructor
    }
}

const User = new user4("Piyush") // => This will generate a user object from the above class
User.getName();


//---------------------------------OUTPUT BASED---------------------------------
//1)
    const user4 = {
        firstName: 'Piyush!',
        getName() {
        const firstName = 'Jen!';
        return this.firstName;
        }
    };
    console.log(user4.getName()); // What is logged?
                                                                                                                                                             //Piyush!

//2)
  function makeUser() {
    return {
      name: "John",
      ref: this
    };
  }
  
  let use5 = makeUser();
  
  alert( user5.ref.name ); // What's the result?
                                                                                                                                                     //if a function is called normally without dot notation then this points to the owner/parent of the function call,

  //follow up
  //How do u make it work?
  
                                                                                                                                                                                function makeUser() {
                                                                                                                                                                                    return {
                                                                                                                                                                                    name: "John",
                                                                                                                                                                                    ref(){
                                                                                                                                                                                        return this;
                                                                                                                                                                                    }
                                                                                                                                                                                    };
                                                                                                                                                                                }
                                                                                                                                                                                
                                                                                                                                                                                let use6 = makeUser();
                                                                                                                                                                                
                                                                                                                                                                                alert( user5.ref().name);

//3)
  const useer = {
     name: 'Piyush Agarwal!', 
     logMessage() {
         console.log(this.name); // What is logged?
         } 
        };
        
    setTimeout(useer.logMessage, 1000);
                                                                                                                                                     //When you pass useer.logMessage to setTimeout, you are passing a reference to the function, not calling it as a method of useer objext. Therefore, the context (this) is lost, and this will not refer to the useer object anymore.


     //follow up
  //How do u make it work?
                                                                                                                                                    setTimeout(function(){
                                                                                                                                                        useer.logMessage();
                                                                                                                                                    }, 1000);

                                                                                                                                                    //When setTimeout is called with an anonymous function, this function does not change the context (this) 
                                                                                                                                                    //The anonymous function defined in setTimeout creates a new scope when executed after 1000 milliseconds. this time reference will not change

  //4)
    const user8 = { 
        name: 'Piyush',
        greet() { 
            return `Hello, ${this.name}!`; 
        }, 
        farewell: () => { 
            return `Goodbye, ${this.name}!`; 
        } 
    }; 
        console.log(user.greet()); // What is logged? 
        console.log(user.farewell()); // What is logged?
                                                                                                                                                       //farewell is a arrow function and will points to window obj becoz this keyword value will come from the parent function of the arrow function and parent doesn/t excist


 //5)
 /*
    Create an object `calculator` with three methods:

    - `read()` prompts for two values and saves them as object properties with names `a` and `b` respectively.
    - `sum()` returns the sum of saved values.
    - `mul()` multiplies saved values and returns the result.
*/

                                                                                                                                                    const calculator = {
                                                                                                                                                        read(){
                                                                                                                                                            this.a = +prompt("a = ",0); //this.a assign "a" property to object
                                                                                                                                                            this.b = +prompt("b = ",0); //this.a assign "a" property to object
                                                                                                                                                        },
                                                                                                                                                        sum(){
                                                                                                                                                            return this.a + this.b;
                                                                                                                                                        },
                                                                                                                                                        mul(){
                                                                                                                                                            return this.a * this.b
                                                                                                                                                        }
                                                                                                                                                    }

                                                                                                                                                    calculator.read();
                                                                                                                                                    alert( calculator.sum() );
                                                                                                                                                    alert( calculator.mul() );


//6)what will be the output?
    var length = 4; 
    function callback() { 
        console.log(this.length); // What is logged? 
    } 
    const object = { 
        length: 5, 
        method(fn) { 
            fn(); 
        } 
    }; 

    object.method(callback);
                                                                                                                                                          //0 as `callback()` it is called as a regular function, not as a method of object so this will point to global object.


//7)
    var length = 4;

    function callback() { 
        console.log(this.length); // What is logged? 
    }
     const object1 = { 
        length: 5, 
        method() { 
            arguments[0](); 
        } 
    }; 
        
    object.method(callback, 1, 2);
                                                                                                                                                         // arguments[callback, 1, 2] here array also consider to be object and array has a property as length so 3

//8)create obj to perform below
//const result = calc.add(10).multiply(5).subtract(30).add(10) 
//console.log(result.total);


                                                                                                                                                    var calc = { 
                                                                                                                                                        total: 0,
                                                                                                                                                        add(a) { 
                                                                                                                                                            this.total += a; 
                                                                                                                                                            return this; //return this to return whole object to perform remaining function
                                                                                                                                                        }, 
                                                                                                                                                        subtract(a) { 
                                                                                                                                                            this.total -= a; 
                                                                                                                                                            return this; 
                                                                                                                                                        }, 
                                                                                                                                                        multiply(a) { 
                                                                                                                                                            this.total *= a; 
                                                                                                                                                            return this; 
                                                                                                                                                        }, 
                                                                                                                                                    };
const result = calc.add(10).multiply(5).subtract(30).add(10) 
console.log(result.total);
