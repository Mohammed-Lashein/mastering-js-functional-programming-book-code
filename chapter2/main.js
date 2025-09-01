export function once(fn) {
  let done = false;
  return (...args) => {
    if(!done) {
      done = true
      fn(...args)
    }
  }
}
export function onceAndAfter(f, g) {
  let done = false
  return (...args) => {
    if(!done) {
      done = true
      // try logging the arguments to see them in the tests
      console.log('these are args', args);
      
      f(...args)
    }    
    
    if(done) {
      g(...args)
    }
  }
}