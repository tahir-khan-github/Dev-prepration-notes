//promises - it tells upcoming success/failure event of an asynchronous operation
//Promises are a tool in JavaScript for handling asynchronous operations it also solves callback hell
//js is a single threaded so it executes syncronus task first and then asycnchronus

console.log("start");

function importantAction(username) {
  setTimeout(() => {
    return username;
  }, 1000);
}

const message = importantAction("abcs");
console.log(message); //undefiend because js executes it in syncronus and at that time its value was undefined

console.log("finish");

//can be fixed by using callbacks

console.log("start");

function importantAction(username, cb) {
  setTimeout(() => {
    cb(username);
  }, 1000);
}

importantAction("abcs", (message) => console.log(message)); //now when time reaches callback gets returned and then will print message

console.log("finish");

function func1(username, cb) {
  setTimeout(() => {
    cb(username);
  }, 1000);
}

function func2(username, cb) {
  setTimeout(() => {
    cb(username);
  }, 1000);
}

importantAction("abcs", (message) => {
  console.log(message);
  func1("cdew", (message1) => {
    console.log(message1);
    func2("asdasd", (message2) => {
      console.log(message2);
    });
  });
}); // callbaclk hell, it  is a problem caused by deeply nested callbacks in asynchronous code,

//fix the call back hell

//-------------------------promise chaining------------------
function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(username);
    }, 1000);
  });
}
function func1(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(username);
    }, 1000);
  });
}
function func2(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(username);
    }, 1000);
  });
}

importantAction("abcd")
  .then((res) => {
    console.log(res);
    return func1("efgg");
  })
  .then((res) => {
    console.log(res);
    return func2("hijkl");
  })
  .then((res) => {
    console.log(res);
  });

//-----------------promise combinater------------
//it helps us to execute more than one promise at a time and return result accordingly
//1)Promise.all (it takes array of promises and resolve them and return an array of result if any one fail it will fail other as well)

console
  .log(
    Promise.all([importantAction("abcd"), func1("asdsad"), func2("asdasdasd")])
  )
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

//2)Promise.race  (it will return first resolve/rejected promise)

//3)Promise.allSettled (it works like Promise.all but if any fail it will return the all promises irrespective of fail or success)

//4)Promise.any (it will return only the first resolved Promise , if all fail it will return all fail)

//---------------------------async await--------------

const result = async () => {
  try {
    const message = await importantAction("asdsad");
    console.log(message)
    const message1 = await func1("asdsad");
    console.log(message1)
    const message2 = await func2("asdsad");
    console.log(message2);
  } catch (error) {
    console.log(error);
  }
};

result();


//-----------------------------output based questions--------------------------
//1)
console.log("start")

const promise1 = Promise((resolve, reject)=>{
    console.log(1);
    resolve(2);  
})

promise1.then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})

console.log("end")                                                                                                                      //start 1 end 2

//2)
console.log("start")

const promise2 = Promise((resolve, reject)=>{
    console.log(1); 
    resolve(2);  
    console.log(3)
})

promise1.then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})

console.log("end")                                                                                                                        //start 1 3 end 2

//3)
console.log("start")

const promise3 = Promise((resolve, reject)=>{
    console.log(1);                                                                                                                       //synchronus
    console.log(3)                                                                                                                         //synchronus
})

promise1.then((res)=>{ // it will not come to this block because resolve is not provided
    console.log(res)
}).catch((err)=>{
    console.log(err)
})

console.log("end")                                                                                                                        //start 1 3 end 

//4)
function job(){
    return new Promise((resolve, reject)=>{
        reject()
    })
} 

const prom = job();

prom
    .then((res)=>{console.log("success")})
    .then((res)=>{console.log("success1")})
    .then((res)=>{console.log("success2")})
    .catch((res)=>{console.log("fail")})
    .then((res)=>console.log("success4"))                                                                                               //fail success4

//5)
function job1(state){
    return new Promise((resolve, reject)=>{
       if(state){
            resolve("success")
       }else{
        reject("error")
       }
    })
} 

const prom1 = job1(true);

prom
    .then((res)=>{
      console.log(res)

      return job1(false)
    })
    .catch((err)=>{
      console.log(err)

      return "error caught"
    })
    .then((res)=>{
      console.log(res)

      return job1(true)
    }) 
    .catch((err)=>{
      console.log(err)
    })  
                                                                                                                                           //success , error, error caught


//5.1)
prom
  .then((data)=>{
    console.log(data)
    return job1(true)
  })
  .then((data)=>{
    if(data !== "victory"){
      throw "Defeat";
    }
    return job1(true)
  })
  .then((data)=>{
    console.log(data)
  })
  .catch((err)=>{
    console.log(err)
    return "Error caught"
  })
  .then((res)=>{
    console.log(res)
    return new Error("test")
  }) 
  .then((res)=>{
    console.log(res.message)
  }) 
  .catch((err)=>{
    console.log(err)
  })
                                                                                                                                          //success, Defeat, error, error caught, Sucess: test

//6)convert to async await
    function loadJson (url){
        return fetch(url).then((res)=>{
          if(res.status === 200) return res.json();
          else throw new Error(res.status)
        })
    }

    loadJson("asdasd").catch((err)=>console.log(err))

                                                                                                                                          async function loadJson1 (url){
                                                                                                                                            let res = await fetch(url);
                                                                                                                                            if(res.status === 200){
                                                                                                                                              let json = await res.json
                                                                                                                                              return json;
                                                                                                                                            }
                                                                                                                                            throw new Error(res.status)
                                                                                                                                          }


//7)resolve multiple promisses recursively


                                                                                                                                          function promRec(promises){
                                                                                                                                            if(promises.length === 0) return;

                                                                                                                                            let currPromise = promises.shift();
                                                                                                                                            currPromise.then((res)=>console.log(res)).catch((err)=> console.log(err))

                                                                                                                                            promRec(promises)

                                                                                                                                          }

//8)Promise ployfill 

// async = Promise(creation) -> .then(initialization of cb) -> resolve(val)

 function myPromise(miancb){

  let onResolve, onReject;
  let isResolved, isReject, isCalled = false, value;


  function resolve(val){
    isResolved = true
    value = val
    if(typeof onResolve === 'function'){
      onResolve(val)
      isCalled = true
    }
  }

  function reject(val){
    isReject = true;
    value = val;
    if(typeof onReject === 'function'){
      onReject(val)
      isCalled = true
    }
  }

  this.then = function (cb){
    onResolve = cb;
    if(isResolved && !isCalled){
      resolve(Value)
    }
    return this;
  }

  this.catch = function (cb){
    onReject = cb;
    if(isReject && !isCalled){
      reject(Value)
    }
    return this;
  }

  try {
    miancb(resolve, reject)
  } catch (error) {
      console.log(error)
  }
}

const p1 = new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve(2)
    }, 1000);
})//async

const p2 = new Promise((resolve, reject)=>{
    resolve(2)
})//sycn

p1.then((res)=> console.log(res)).catch((err)=>console.log(err))
p2.then((res)=> console.log(res)).catch((err)=>console.log(err))

//9)promise.all polyfill

Promise.AllPolyfill = function(promises){
  return new Promise((resolve, reject)=>{
    let result = [];

    if(!promises.length){
      resolve(result);
      return;
    }
    let pending = promises.length;

    promises.forEach((promise, idx) => {
        Promise.resolve(promise).then((res)=>{
          result[idx] = res;
          pending--;

          if(pending === 0){
            resolve(result)
          }
        }, reject)
    });

  })
}


const result1 = Promise.all(['p1','p2'])

result1.then((res)=> console.log(res)).catch((res)=> console.log(res))

