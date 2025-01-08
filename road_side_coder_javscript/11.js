//event propagation
//1) process of deciding how events  go down the DOM tree

//2) event bubbling - events are executed bottom up (default)
//focus and blur do not bubble

const div = document.querySelector('div');
const form = document.querySelector('form');
const button = document.querySelector('button');    

div.addEventListener('click',handler);

form.addEventListener('click',handler);

button.addEventListener('click', handler);

function handler(event) {
    alert(
        "current target = "+event.currentTarget.tagName +
        ", target = "+event.target.tagName +
        ", this = "+this.tagName
    );
  
}

//3)diff b/w event.target, this.target and event.currentTarget
//event.target - the element that triggered the event
//this.target - the element that has the event handler
//event.currentTarget - the element that has the event handler

//4)event capturing - makes event to execute from top to bottom
div.addEventListener('click',()=>{
    alert("div clicked")
},{
    capture:true
});

form.addEventListener('click',()=>{
    alert("form clicked")
},{
    capture:true
});

button.addEventListener('click', ()=>{
    alert("button clicked")
},{
    capture:true
});

//5)how to stop event propagation
form.addEventListener('click',(e)=>{
    e.stopPropagation();
    alert("div clicked")
},{
    capture:true
});



//6)event delegation - technique where you attach a single event listener to a parent element that handles events for multiple child elements
const parent = document.getElementById('parent');

        // Add a single event listener to the parent element
        parent.addEventListener('click', function(event) {
            // Check if the clicked element has the class 'child'
            if (event.target && event.target.classList.contains('child')) {
                console.log('Button clicked:', event.target.textContent);
            }
        })


//-----------------output based---------------


