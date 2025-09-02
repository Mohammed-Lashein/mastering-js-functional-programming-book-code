# 2nd book this and Object prototypes
When I was learning in chapter3 from mastering js fp book, I found that I need some concepts from ydkjs book, so I will study the 2nd book (maybe not all of it but just some chapters) so I can follow along better with the main book.

## Chapter 1 : this or that?
### Some misconceptions about `this`: 

#### Misconception 1: Itself
The 1st misconception is to assume that `this` refers to the function itself (while grammatically correct, this isn't the case in js)

Given the following code: 
```js
// iteslf misconception
function foo(num) {
  console.log('foo '+ num)
  this.count++
}
foo.count = 0
var i;
for(i = 0; i < 10; i++) {
  if(i > 5) {
    foo(i)
    // foo 6
    // foo 7
    // foo 8
    // foo 9
  }
}
console.log(foo.count) // 0 . How amazing!
```
Explanation of the above behavior: 
1. Given that `this` gets its value from where it is called not where it is defined, since we called our function in the loop, `this` referred to the global `window` object.
2. On the 1st execution, `foo` attempted to increment the value of the not existing property `count` on `window` object, so the code was basically doing `this.undefined++`
3. Incrementing undefined will result in a `NaN`
4. What about `foo.count` ? 🤔
It wasn't incremented at all, since we attempted to increment it but in a wrong way.

So what is the correct way then?
We must make `this` point to the function `foo`: 
```js
function foo(num) {
  console.log('foo '+ num)
  this.count++
}
foo.count = 0
var i;
for(i = 0; i < 10; i++) {
  if(i > 5) {
    foo.call(foo, i)
    // foo 6
    // foo 7
    // foo 8
    // foo 9
  }
}
console.log(foo.count) // 4 Correct!
```
By using `foo.call(foo, i)`, we are forcing the value of `this` to refer to `foo()`.

#### Misconception 2: Its scope
The next misconception is that `this` refers to the function's scope. In one end this is true, while in another end this is quite misguided. 

```js
function foo() {
  var a = 2
  this.bar()
  // bar() // also works
}
function bar() {
  console.log(this.a)
}
foo() // Reference Error: a is not defined
// although in the browser, I just got undefined, not a reference error
```
Either calling `this.bar()` or `bar()` will work, since it is a global function, it will be available as a method of the `window` object.

In the previous snippet, we are trying to make a bridge between lexical scope and using `this`. It is important to note that this bridge **doesn't exist**.
