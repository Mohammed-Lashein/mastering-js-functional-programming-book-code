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