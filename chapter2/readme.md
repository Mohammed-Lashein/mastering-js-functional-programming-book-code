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
_____
### Using mocks
Given this test: 
```js
const fetchUser = async (id) => {
  const res = await fetch('/users/' + id); // Returns a Promise that resolves to a `Response` object
  const user = await res.json() // Returns another promise that resolves to the parsed json
  return user;
}
test.only("mocking fetch", async () => {
  // Arrange
  window.fetch = jest.fn()
  /* 
    Note that mockFn.mockResolveValue(value) is a shorthand for : 
      jest.fn().mockImplementation((value) => Promise.resolve(value))

    That's why although we are mocking fetch, we still need to await the result as the returned result
    is a Promise. 

    Another note, if you inspect fetchUser() from the source code, you will find that we await res.json().
    That's why we return an obj that has a property json from the mocked fetch
  */
  window.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue({name: 'kawaki'})
  })
  // Act
  const user = await fetchUser(1)
  // Assert
  expect(user).toEqual({name: 'kawaki'})
  expect(window.fetch).toHaveBeenCalledWith('/users/1')
})
```
What if we spied on `fetch` instead of mocking it?  
If you spy on it, the network request will still me made unless you actually provide a mock implementation.
Whereas on mocking `fetch`, it is replaced with `jest.fn()` so there is no chance of hitting the network.
### Spying on `fetch`
Given the following code: 
```js
test.only("spying on fetch", async () => {
  const fetchSpy = jest
  .spyOn(window, 'fetch')
  .mockResolvedValue({
    json: jest.fn().mockResolvedValue({name: 'bar'})
  })

  const user = await fetchUser(2)
  expect(user).toEqual({name: 'bar'})
  expect(fetchSpy).toHaveBeenCalledWith('/users/2')

  fetchSpy.mockRestore()
})
```
On running the test, I got this error: 
> Property `fetch` does not exist in the provided object.

After asking chat, he explained: 
- If we are in a node environment, we need to use `global` instead of `window`.
- If we are in a `jest-environment-jsdom` we may need to define `window.fetch` in order to be able to stub it
  
His answer introduced another question to my mind: Why doesn't `jest-environment-jsdom` provide `fetch` by default? Isn't is supposed to be available since it is a browser API ?  
Chat told me that `jsdom` says that in their docs: 
> jsdom does not attempt to implement web platform APIs that aren’t related to the DOM.

I searched for that sentence on github, but couldn't find it. But it seems that yes jsdom is just focusing on providing DOM APIs not all browser APIs
_____
### Chapter 2 assignments notes
**2.2 Alternator function**
At first, I implemented the `alternator` function like so:
```js
function alternator(fn1, fn2) {
  let alternate = true
    if(alternate) {
    return fn1
  } else {
    return fn2
  }
    alternate = !alternate
}
```
But the tests failed.  
The problem was that since `alternate` flag was a local variable, it was re-initialized every time the function ran.  
What is the solution then? 
We should depend on closures, and that is what I did in the solution present in the assignment file.

This chapter really showed me the power of closures, where we can have encapsulated flags that we can use without polluting the global scope.