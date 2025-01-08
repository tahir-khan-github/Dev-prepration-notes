//debouncing and throttling (used to optimise events)

//debouncing - (search example)
//it limits the execution of function call and waits for certain amount of time before running it again
//when an event stops it calls function after certain time

//debounce 
function debounce(cb, delay){
   let timer;
   return function(...args){
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
        cb(...args);
    }, delay);
   }
}

     // Function to handle the input event
     function handleInput(event) {
        const query = event.target.value;
        document.getElementById('result').innerText = `Searching for: ${query}`;
    }

    // Get the input element
    const searchInput = document.getElementById('searchInput');

    // Add the debounced event listener
    searchInput.addEventListener('input', debounce(handleInput, 300));



//throttling - (scroll event)
//it limits the execution of event handler function, even the event triggers continously
//calls a function at a specified interval of time during an event occurs

//throttle
function throttle(cb, delay){
    let last = 0;
    return function(...args){
        const now = new Date().getTime();
        if(now - lastCall < delay) return; //miantain the interval
        lastCall = now; //miantain the interval after first call
        return cb(...args)
    }
}

