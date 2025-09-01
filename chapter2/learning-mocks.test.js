import { jest } from '@jest/globals';

const fetchUser = async (id) => {
  const res = await fetch('/users/' + id);
  const user = await res.json() 
  return user;
}
test("mocking fetch", async () => {
  // Arrange
  window.fetch = jest.fn()
  window.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue({name: 'foo'})
  })

  // Act
  const user = await fetchUser(1)
  // Assert

  expect(user).toEqual({name: 'foo'})
  expect(window.fetch).toHaveBeenCalledWith('/users/1')
})

test.only("spying on fetch", async () => {
  window.fetch = jest.fn()
  const fetchSpy = jest
  .spyOn(window, 'fetch')
  .mockResolvedValue({
    json: jest.fn().mockResolvedValue({name: 'bar'})
  })

  const user = await fetchUser(2)
  expect(user).toEqual({name: 'bar'})
  expect(fetchSpy).toHaveBeenCalledWith('/users/2')

  fetchSpy.mockRestore()
})
