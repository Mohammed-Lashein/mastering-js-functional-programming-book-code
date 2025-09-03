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

#### Finally, what's this?
In a nutshell: 
> It is not an author-time binding, but instead a runtime binding

## Chapter 2: this all makes sense now!
A better way to visualize the callstack as explained by [elzero web school](https://elzero.org/javascript-2021-call-stack-and-web-api/)
```js
// ch2
function baz() {
  console.log('baz')
  bar()
}
function bar() {
  console.log('bar')
  foo()
}
function foo() {
  console.log('foo')
}
debugger;
baz()
/* 
Call stack
===========
foo()
===========
bar()
===========
baz()
===========
*/
```

How does the call-site where `this` will point during the execution of a function? 🤔  
=> There are **4** rules to follow 🙌

### Rule 1: Default Binding
`this` refers to the `window` object on calling the function from the global scope: 
```js
function foo() {
  console.log(this.a)
}
var a  = 2
foo() // 2
```
Why does the above snippet work?  
=> Because now the variable `a` is present as a property on the window object (Note that if we used `let` instead of `var`, this won't happen and we will get `undefined`).

To quote from the book: 
> The first thing to note, if you were not already aware, is that variables declared in the global scope, as `var a = 2` is, are synonymous with global-object properties of the same name. They’re not copies of each other, they *are* each other. Think of it as two sides of the same coin.

### Grammatical sidenote
Is the expression "in one end... on the other end" correct?  
The expression is actually
> On the one hand, ... on the other hand  

Example: 
> On the one hand, this option is cheaper. On the other hand, it takes more time.

### Rule 2: Implicit Binding
When we call our `foo` function as a method on an object, then `this` in `foo()` is bound to that object.
Given this snippet: 
```js
function foo() {
  console.log(this.a)
}
var obj2 = {
  a: 42,
  foo: foo
}
var obj1 = {
  a: 2,
  obj2: obj2
}
obj1.obj2.foo() // 42
```
In the above snippet, `foo` got the value of the property `a` as follows: 
```js
obj1.obj2 // -> refers to obj2
obj2.foo() // --> foo() will read the 'a' property of obj2
```
Now notice this contrast: 
```js
obj1.obj2.foo.call(obj1) // 2
```
Since we explicitly bound `this` to `obj1`, `foo()` will read the property `a` from `obj1`.

#### Implicitly lost
In this code snippet: 
```js
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo
}
var bar = obj.foo
var a = 'oops, global'
bar() // oops, global 
```
`bar` is just another reference to `foo`, and since we are calling `bar` in the global context, `this` will get its value from the `default binding`.

It gets tricky when we try to pass `foo()` as a callback: 
```js
function doFoo(fn) {
  fn()
}
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo
}
var a = 'oops, global'

doFoo(obj.foo) // oops, global
```
Although that `foo` is now called as a cb in `doFoo`, but since `doFoo` is called in the global context, `this` will get its value through the **default binding**