# Chapter 1
- FP is a different way of thinking from OOP. FP focuses on *what* should be done, rather than on *how*.
- Don't fall into the trap of thinking that FP is our goal. It is just a tool that will help us write better code.

- What FP is not: 
  - FP isn't the opposite of OOP: We can use both together in an application and get the best of both worlds

An amazing quote from the book: 
> The vast majority of today's web code is written in imperative, non-functional ways, and most coders are used to that way of working
I totally agree with this sentence and github is really full of this imperative code.

## Functions are first class objects
- They are aka "first class citizens"
- What does that mean?
=> It means that we can do everything with functions that we can do with other objects. 

- Recursion can be used as an alternative for `while` and `for` loops.


**Lambda calculus p20 notes**
<!-- to be written... -->
ƛ

## Understanding `apply` and `call`
The syntax is obvious, but why would I need to use any of them?

### Use cases for `apply()`: 
Gemini mentioned 2 nice use cases with examples: 

1. Dynamic `this` context
You need to explicitly set the `this` value for a fn call, allowing you to borrow methods from one object and apply them to another.

The example: The example from mdn docs below (which has `arr1` and `arr2`);


2. Arguments are provided as an array
You have the arguments to be passed to a function as an array and you neither want to destructure the array elements individually nor use the spread operator. 

Here is a nice example from [mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply): 
```js
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);
// This is equal to Math.max(numbers[0], ...)
// or manually Math.max(5, 6, ...)

console.log(max);
// Expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// Expected output: 2
```

Another nice example also from [mdn docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#using_apply_to_append_an_array_to_another): 

Given the following code: 
```js
const arr1 = [1,2,3];
const arr2 = ['a', 'b']
```
We have an array `arr2`, and we want to push its elements to `arr1`.
We can do so: 
```js
console.log(arr1.push(arr2)) // [1,2,3, ['a', 'b']]
```
WRONG!  
  The above code will print 4 (The length of `arr1`). I have to read in the docs to see if `Array.push()` returns the array elements.

  Update: After reading [in the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push#return_value) I found this: 
  
> The new length property of the object upon which the method was called.

Oh this is not what we wanted!
Now we have the `arr2` as a nested array in `arr1`.

`Array.concat()` has the desirable effect we want, but the problem is that it returns a new array and doesn't modify the array in hand (This is a good FP practice, but for the sake of our example, we want to mutate the original array).

What can we do then? 🤔  
=> Quoting from the docs: 
> In this case, you can use apply to implicitly "spread" an array as a series of arguments.
```js
  const arr1 = [1,2,3];
  const arr2 = ['a', 'b']
  arr1.push.apply(arr1, arr2);
  console.log(arr1);
```

## A grammatical stop 
Which sentence is grammatically correct (regarding using neither nor and the correctness of the meaning)?
Sentence A : 
>"You have the arguments to be passed to a function as an array and you neither want to destructure the array elements individually nor use the spread operator" ✅  
Sentence B :

>"If you don’t want to neither … nor …" ❌

*Answer*: Sentence B will have **double negation** which will flip the meaning we want.

Another form suggested by chat, where he mentioned that it is less formal and more conversational: 
> You don’t want to destructure the array elements individually or use the spread operator.

### TL;DR
- Neither … nor … sounds a bit more formal and emphatic.
- Don’t … or … is more conversational.