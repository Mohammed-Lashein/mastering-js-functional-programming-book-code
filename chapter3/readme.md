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
