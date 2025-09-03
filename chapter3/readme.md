# Chapter 3 

### `this` quirks
We will be discussing this code snippet for some time: 
```js
function showItself1(identity) {
  this.identity = identity
  setTimeout(function() {
    console.log(this.identity)
  }, 1000)
}
const x = new showItself1("functional")
```

**Wonders and answers**
1. How on running `node <file-containing-the-function-call>` the `setTimeout` works even though it is a web api?  
=> Actually node also has `setTimeout` that behaves exactly like the one present in the browser, but quoting from their docs calling `setTimeout` returns a `Timeout` instance instead of just a numeric timer id as the function does in the browser.

2. What is the reason that the function returns `undefined` ?  
=> The answer in bullet points: 
- In normal js functions, the value of `this` depends on **how it is called**, not where it is defined.
- Since `setTimeout` calls our function as a plain function not as a method of `x`, the `this` will have value of : 
  - In **strict mode**: `undefined`
  - In **non-strict mode**: `window` in browsers, `global` in nodejs
- Since the `global` object doesn't have an `identity` property, we get `undefined`

3. Grammatical sidenote  
Should I say
> node has also `setTimeout`   

OR  

> node also has `setTimeout`

=> After asking chat, he gave me this hint: 
- If **has** is a *main verb* in the sentence: use **also has**
- If **has** is an *auxiliary verb* (part of a tense) : use **has also**

Examples: 
- She *also* has a car (has here is a main verb)
- The subject has *also* been discussed (has is part of a tense, not the main verb of the sentence)

4. What recieved the `identity` property then?
- The `showItself1` function (which can be written as a class) ❌
- The `showItself1` newly created instance ✅
_____
### Tacit programming (point free)
It is a programming paradigm in which a function definition doesn't include information regarding its arguments, using function composition instead.

Example:
```js
fetch("/some/url").then(processResult)
```
Is this feature specific to thenables? 🤔  
Actually not. It is also available for the `setTimeout` api: 
```js
setTimeout(console.log, 1000, 'hello');
```
So, is it available to any callback in js?   
It is available to the APIs that implement this functionality, not all callbacks.

#### Tacit programming + `this` keyword inquiry
In the following snippet: 
```js
fetch("some/remote/url").then(myObject.store)
// vs
fetch("some/remote/url").then(myObject.store.bind(myObject));
```
Why do we need to call `bind` although we are calling the object's method?  
By passing `myObject.store` to `then()`, we are simply passing a *reference* to the function that is stored in the object, so the `this` value will resolve based on the execution context (which is the global context in our case) and the *implicit binding* to our obj will not work.
That's why we need to *bind* `this` to our object.

What about using callbacks?
```js
function doSomeMethod(someData) {
  return someObject.someMethod(someData);
}
const doSomeMethod = someObject.someMethod.bind(someObject);
```
The previous example is a bit obscure. It needs some explanation: 
```js

// this is the correct way of calling someMethod with a `this` bound to someObject
function doSomeMethod(someData) {
  return someObject.someMethod(someData)
}

// Now following tacit programming principles
const doSomeMethod = someObject.someMethod

/* The above would cause unexpected behavior since we just created a reference to the someMethod of someObject, so `this` which won't be bound to someObject but instead will get its value from the calling context .

  That's why we need to *bind* the `this` value to our object: 
*/
const doSomeMethod = someObject.someMethod.bind(someObject);

// Now we can use our method and it will work correctly
fetch("some/remote/url").then(doSomeMethod);
```