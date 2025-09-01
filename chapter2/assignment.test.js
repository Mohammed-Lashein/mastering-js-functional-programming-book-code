import { jest } from '@jest/globals'

// assignment functions

// 2.1 No extra variables
function onceWithNoLocalFlag(fn) {
	// I couldn't make the implementation myself, so I asked chat and he suggested this implementation
	// Note that it is similar to the one we tried at the beginning of the chapter
	return (...args) => {
		if (fn) {
			fn(...args)
		}
		fn = null
	}
}

const o = onceWithNoLocalFlag(() => {
	console.log('pudding')
})
o()
o()
o()

// 2.2 Alternating functions
function alternator(fn1, fn2) {
  let alternate = true
  return () => {
    if(alternate) {
    alternate = !alternate
    return fn1()
  } else {
    alternate = !alternate
    return fn2()
  }
  }
}

// assignment tests
test('assignment 2.1', () => {
	const fn = jest.fn()
	const willBeExecutedOnce = jest.fn(onceWithNoLocalFlag(fn))

	willBeExecutedOnce()
	willBeExecutedOnce()
	willBeExecutedOnce()
	expect(fn).toHaveBeenCalledTimes(1)
})
test('alternator', () => {
  const sayA = () => 'A'
  const sayB = () => 'B'
  const alternate = alternator(sayA, sayB)

  expect(alternate()).toBe('A')
  expect(alternate()).toBe('B')
  expect(alternate()).toBe('A')
  expect(alternate()).toBe('B')
})
