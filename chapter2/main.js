export function once(fn) {
	let done = false
	return (...args) => {
		if (!done) {
			done = true
			fn(...args)
		}
	}
}
export function onceAndAfter(f, g) {
	let done = false
	return (...args) => {
		if (!done) {
			done = true
			// try logging the arguments to see them in the tests
			console.log('these are args', args)

			f(...args)
		} else {
			g(...args)
		}
		/* Wrong implementation after testing!
      This implementation will result in this if block being executed in the first call to the 
      function since the variable done will be true after the running of the 1st condition 
      (which is not what we want).

      That's why the writer used else instead of another if block. 

      The proposed solution: 
      [1] make the condition that calls function g at the top 
      [2] Use else as the writer did
    */

		// if (done) {
		// 	g(...args)
		// }
	}
}
