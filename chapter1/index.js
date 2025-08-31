/* 
  Closure example: Although that `newCounter` exits, the function it returns 
  still holds a reference to the `count` variable.
  
  Note that this is not a pure function, since on calling it with the same args 
  (no args), it returns a different value each time.
*/
function newCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  }
}
const nc = newCounter();
// console.log(nc()); // 1
// console.log(nc()); // 2
// console.log(nc()); // 3

// Questions code

const makeSaluteClass = term => class {
  constructor(x) {
    this.x = x;

  }
  salute(y) {
    console.log(`${this.x} says ${term} to ${y}`)
  }
}

const Spanish = makeSaluteClass('hola')
new Spanish('alpha').salute('beta')


function upwardFactorial(n, current = 1) {
  if (current === n) {
    return n;
  } 
  return upwardFactorial(n, current + 1) * current;
}
console.log(upwardFactorial(5))

/* 

This diagram is essential for understanding the recursion part. Since the call stack is a LIFO data structure,
start substituting from above to bottom.

Eg) When you reach this line : upwardFactorial(5, 4) => return upwardFactorial(5, 5) * 4
substitute upwardFactorial(5, 5) with just 5 so the return value of  upwardFactorial(5, 4) => 5 * 4

And so on till all of the functions in the callstack are executed.

================
upwardFactorial(5, 5) => return 5
================
upwardFactorial(5, 4) => return upwardFactorial(5, 5) * 4
================
upwardFactorial(5, 3) => return upwardFactorial(5, 4) * 3
================
upwardFactorial(5, 2) => returns upwardFactorial(3, 2) * 2
================
upwardFactorial(5, 1) => returns upwardFactorial(5, 2) * 1
================

*/

// return (((5 * 4) * 3 ) * 2) * 1

/* 
  Chat also suggested a nice diagram, other than the one I created above, which nicely helps visualizing 
  the call stack and execution flow

  CALL STACK (top = most recent)          EXPRESSION BEING BUILT
---------------------------------------------------------------
upwardFactorial(5, 1)                   1 * upwardFactorial(5, 2)
---------------------------------------------------------------
upwardFactorial(5, 2)                   1 * (2 * upwardFactorial(5, 3))
upwardFactorial(5, 1)
---------------------------------------------------------------
upwardFactorial(5, 3)                   1 * (2 * (3 * upwardFactorial(5, 4)))
upwardFactorial(5, 2)
upwardFactorial(5, 1)
---------------------------------------------------------------
upwardFactorial(5, 4)                   1 * (2 * (3 * (4 * upwardFactorial(5, 5))))
upwardFactorial(5, 3)
upwardFactorial(5, 2)
upwardFactorial(5, 1)
---------------------------------------------------------------
upwardFactorial(5, 5)                   1 * (2 * (3 * (4 * 5)))
upwardFactorial(5, 4)
upwardFactorial(5, 3)
upwardFactorial(5, 2)
upwardFactorial(5, 1)
---------------------------------------------------------------
(Base case returns 5)
*/
