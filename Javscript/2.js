
//map, filter and reduce array methods

const degitis = [1,2,3,4];

//map -> returns new array from existing by applying function to each elements
 const multiply = degitis.map((el,i,arr)=>{
    return el *3;
 })
 console.log(degitis)
 console.log(multiply)

 //filter -> retuens new array from existing with conditional pushing of elements
 const filter = degitis.filter((el,i,arr)=>{
    if(el > 2){
        return el;
    }
 })
 console.log(filter);

 //reduce -> returns a single value after evaluation
 const sum = degitis.reduce((acc,curr,i,arr)=>{
    return acc + curr;
 },0)// (call back and initial value) if initial is not passed then it make first arr elem as its initial
 console.log(sum);

 //polyfills adding or modifying new functions to array
 
 //map
 Array.prototype.myMap = function (cb){
    const temp = []; 
    for (let i = 0; i < this.length; i++) { //this refers to parent array
        temp.push(cb(this[i],i,this));
    }
    return temp;
 }

 const newMap = degitis.myMap((el,i,arr)=>{
    return el *3;
 })
 console.log(newMap)

 //filter
 Array.prototype.myFilter = function (cb){
    const temp = []; 
    for (let i = 0; i < this.length; i++) { //this refers to parent array
        if(cb(this[i],i,this)){
            temp.push(this[i]);
        }
    }
    return temp;
 }
 const newFilter = degitis.myFilter((el,i,arr)=>{
    return el > 2;
 })
 console.log(newFilter)

 //reduce
 Array.prototype.myReduce = function (cb,initialValue){
    var accumulator = initialValue;
    for (let i = 0; i < this.length; i++) { //this refers to parent array
       accumulator = accumulator?cb(accumulator,this[i],i,this) : this[i];
    }
    return accumulator;
 }


 const newSum = degitis.myReduce((acc,curr,i,arr)=>{
    return acc + curr;
 },0)
 console.log(newSum);

 //map vs forEach
 "-> map returns new array where as foreach modifies the existing one also in map we can chain other methods to map"
 degitis.forEach((el,i)=>{
   degitis[i] = el + 2;
 })
 console.log(degitis)
 

 //map,filter,reduce chaing output question

 let students = [
   {name:"Piyus", rollnumber:31, marks:80},
   {name:"Jenny", rollnumber:15, marks:69},
   {name:"Kuchal", rollnumber:16, marks:35},
   {name:"Dilpreet", rollnumber:7, marks:55},
 ];

 //1) Return names of students and make it capital ?

 let capNames = students.map((e)=>{
   return e.name.toUpperCase();
 })

//  console.log(capNames);

 //2)return only details of students who scored more than 60?

 let scoreDetails = students.filter((e)=> e.marks > 60);
//  console.log(scoreDetails);

 //3)return only details of students who scored more than 60 and roll is greater than 15?
 let scoreAndRollDetails = students.filter((e)=> e.marks > 60 && e.rollnumber > 15);
//  console.log(scoreAndRollDetails)

//4)Return sum of marks of all students ?
let sum1 = students.reduce((acc, curr)=>{
   return acc + curr.marks;
},0)
// console.log(sum);

//5)return only names of students who scored more than 60?
let scoreName = students.filter((e)=> e.marks > 60).map((e)=>e.name)

// console.log(scoreName)

//6)return total marks of students with marks greater than 60 after 20 marks have been added to those who scored less than 60
let totalSum = students.map((e)=>{
   if(e.marks < 60){
      e.marks += 20;
   }
   return e;
}).filter((e)=> e.marks > 60).reduce((acc,curr)=> acc + curr.marks,0)


console.log(totalSum)