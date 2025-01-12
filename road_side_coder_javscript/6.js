//what are objects?
//An object is a collection of related data and/or functionality.


//access
let user = { name: "Roadside Coder",
             age: 24
            };

console.log(user.name)

//modify

user.name = "tahir";
console.log(user.name)
console.log(user)

//delete
delete user.age;

console.log(user);

//what is output?
const func = (function(a){
     delete a; 
     return a;
     })(5);

console.log(func); //5 becoz delete keyword works on object only


//How can you access a multiword key of an object?

let user1 = { name: "Roadside Coder",
             age: 24,
             "interview time": true
            };
console.log(user1["interview time"]);


// delete delete user["like the video"];

//adding dynamic property to object

let property = "firstName";
let name = "tahir khan"

let user2 = {
    [property]:name,
}

console.log(user2);

//how to iterate throough object

for(key in user1){
    console.log(user1[key]);
}

//Interview Question

const obj = { 
    a: 'one',
     b: 'two',
      a: 'three'
     }; 
console.log(obj);//incase of similar key last key's value will be considered


//Create a function ```multiplyByTwo(obj) that multiplies all numeric property values of obj by 2.**
let nums = { 
    a: 100, 
    b: 200,
    title: "My nums"
     };

                                                                                                                                        function multiplyByTwo(obj){
                                                                                                                                            for(key in nums){
                                                                                                                                                if(typeof nums[key] === "number"){
                                                                                                                                                    nums[key] = nums[key] * 2;
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }

multiplyByTwo(nums);
console.log(nums);

//Find the output of the following code snippet?
const a = {};
const b = { key: 'b' }; 
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);//456 
//becoz when we try to assign object as a key it converted to a["[object object]"] = 123, a["[object object]"] = 456 and it takes last value of a key


// What is JSON.Stringify and JSON.parse?

let strObj = JSON.stringify(nums); //obj to string

console.log(strObj)

console.log(JSON.parse(strObj))// string to obj

//how to use. = we can use JSON.Stringify to store objects in local storage as local storage doesn't accept obj and only string

localStorage.setItem("items",strObj);

console.log(JSON.parse(localStorage.getItem("items")));

//what is the output? of
console.log([..."lydia"])

// What's the output?
const user3 = { name: 'Lydia', age: 21 }; 
const admin = { admin: true, ...user3 };
console.log(admin)//admin obj with added property of user3


// /Q7 - What's the output of the following code snippet?

const settings = { username: 'lydiahallie', level: 19, health: 90, };
const data = JSON.stringify(settings, ["level", "health"]); 
console.log(data);//only stringfy the given properties from the setting object

//what is the output?
const shape = {
             radius: 10, 
             diameter() { return this.radius * 2; },
             perimeter: () => 2 * Math.PI * this.radius, 
            };

console.log(shape.diameter()); //20 //becoz in normal function this refers to current obj( object that is calling this function)
console.log(shape.perimeter());//NAN becoz in arrow function this refers to window object and radius doesn't exist in window (its parent function which is window object)


//what is Destructuring and renaming in objects?

//Destructuring
let user4={ 
            name1:"Piyush",
             age:24 ,
            fullName :{
                first:"tahir",
                last:"khan"
            }
            }

const {name1}= user4; //taking out specific property of an object like this

const {fullName:{first}} = user4;

console.log(name1);
console.log(first);

//renaming

const {name1: myname}= user4;
console.log(myname)

//What's the output?
// function getItems(fruitList, ...args, favoriteFruit) { return [...fruitList, ...args, favoriteFruit] } error as spread need to at end

function getItems(fruitList, favoriteFruit, ...args) { 
                return [...fruitList, ...args, favoriteFruit] 
            }
getItems(["banana", "apple"], "pear", "orange")

//Object Referencing

//output
//1)
let ce = { greeting: 'Hey!' };
let d;

d = ce;
ce.greeting = 'Hello';
console.log(d.greeting); // Hello becoz variable only refer to obj

//2)
console.log({a:1} == {a:1}); //== losse, === strict
console.log({a:1} === {a:1}); //false becuase both objects have different memory adresses

//3)
let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);//{ name: 'Lydia' } becoz objects address is stored in [0]idx

// person.name = " ";
console.log(members);// { name: " "} becoz now objects been modified itself

//4)

const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();//20 { ...value }(default value untill we didn't pass) ... cloned the object into x so current val will be 20
multiply();//20 again changes happen in cloned object
multiply(value);//20 now here referenece of object is passed to x and it will modify objects value
multiply(value);//40 again reference of obj which is already been modified


//5)
function changeAgeAndReference(person) {
    person.age = 25;
    person = {
      name: 'John',
      age: 50
    };

    return person;
}

const personObj1 = {
    name: 'Alex',
    age: 30
};

const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // -> ? // objects age will be changed as person reference make changes
console.log(personObj2); // -> ? // we provided new reference



//Difference between shallow copy vs deep copy.

//A shallow copy means that certain (sub-)values are still connected to the original variable.
const user6={
    name: 'Jen',
    age: 26
};

const copyOfUser =user;

//A deep copy means that all of the values of the new variable are copied and disconnected from the original variable

const obj1 = {a: 1 ,b: 2}
const objclone1 = Object.assign({},obj1);
const objclone2 = JSON.parse(JSON.stringify(obj1));
const objclone3 = { ...obj1 }

