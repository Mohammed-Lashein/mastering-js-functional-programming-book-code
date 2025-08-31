# Chapter 2 

## Click only once proposed solutions

1. Using a global flag
```js
let isClicked = false;

function billTheUser() {
  if(!isClicked) {
    isClicked = true
    // bill the user
  }
}
```

Problems that a global flag introduces: 
1. We are using a global variable (could be accidentally changed)
2. We must remember to re-initialize it to false if the user wants to make another order
3. `billTheUser()` is now harder to test since it depends on an external flag


2. Removing the handler
```js
function billTheUser() {
  const btn = document.querySelector("#billButton")
  btn.onclick = null
  // bill the user stuff
}
```

Drawbacks of this solution: 
1. the function is not reusable since it is tightly coupled to the button (I see no problem in that since billing the user shouldn't be a reusable feature afterall)
2. You should remember to reset the handler, otherwise the user won't be able to make a second buy
3. Testing will be a burden since you need to provide an actual DOM element in order for the function to work

A suggested enhancement is that we can make the function accept the id of the button, but we still rely on a global flag so this is not a good solution either
```js
function billTheUser(btnId) {
  const btn = document.querySelector(btnId)
}
```

3. Changing the handler
```js
function alreadyBilled() {
  window.alert("Your billing process is in progress. Don't click again please")
}
function billTheUser() {
  document.querySelector("#billButton").onclick = alreadyBilled
}
``` 
This solution has the same limitations as the previous one, so we won't consider it quite good anyway

4. Disabling the button
```js
function billTheUser() {
  document.querySelector("#billButton").setAttribute('disabled', true)
  // billing the user
}
```
Also this solution has the same problems as the previous one.

5. Redefining the handler
Since functions are global, (they get stored as methods on the global window object) we can use this feature to our benefit and change what the function does
```js
function billTheUser() {
  billTheUser = function() {}
  // billing the user
  window.alert("billing the user")
}
```
6. Use a local flag
That's one of the best solutions to consider
```js
  let billTheUser = (clicked => {
    return (some, sales, data) => {
      if(!isClicked) {
        clicked = true;
        window.alert("billing the user")
      }
    }
  })(false)
```
____
### A side note
Given this code snippet: 
```js
function pudding() {
  pudding = function() {console.log('chocolate')}
  console.log('pudding');
}
pudding()
pudding()

window.pudding()
console.log(window)

(function billTheUser(isClicked) {
  if(!isClicked) {
    isClicked = true
    window.alert('billing the user')
  }
})(false);
```
I got this error in the console which prevented the `window.alert('billing the user')` from executing:  
`Uncaught TypeError: console.log(...) is not a function`.  

I asked chat but the answer was ambiguous and wrong, it didn't solve my problem. I searched stackoverflow and [found an exact match to my problem](https://stackoverflow.com/questions/31013221/typeerror-console-log-is-not-a-function).  
The problem was that the `console.log()` that preceeded the `billTheUser` IIFE didn't have a `;` at its end, that caused the IIFE to get passed as a function call to the returned value of `console.log()` which is `undefined`.

From the answer: 
> `console.log(...)` refers to the return value of the function