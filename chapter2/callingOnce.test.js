import { once, onceAndAfter } from './main'
import { jest } from '@jest/globals' // since we are using ESM, jest global object can't be injected

test('once() returns a function that is called only once', () => {
	const func = jest.fn()
	const onceFn = jest.fn(once(func))

	onceFn()
	onceFn()
	onceFn()
	expect(onceFn).toHaveBeenCalledTimes(3)
	expect(func).toHaveBeenCalledTimes(1)
})

test('onceAndAfter is working as expected', () => {
	const fnOnce = jest.fn()
	const fnAfter = jest.fn()
	const onceAndAfterFn = jest.fn(onceAndAfter(fnOnce, fnAfter))

	onceAndAfterFn()
	expect(fnOnce).toHaveBeenCalledTimes(1)
	expect(fnAfter).toHaveBeenCalledTimes(0)

	onceAndAfterFn()
	expect(fnOnce).toHaveBeenCalledTimes(1)
	expect(fnAfter).toHaveBeenCalledTimes(1)

	onceAndAfterFn()
	expect(fnOnce).toHaveBeenCalledTimes(1)
	expect(fnAfter).toHaveBeenCalledTimes(2)
})
