import isPositiveInteger from './isPositiveInteger'

test('undefined', () => {
  expect(isPositiveInteger(undefined)).toBe(false)
})
test('empty', () => {
  expect(isPositiveInteger('')).toBe(false)
})
test('a7', () => {
  expect(isPositiveInteger('a7')).toBe(false)
})
test('7a', () => {
  expect(isPositiveInteger('7a')).toBe(false)
})
test('6.0', () => {
  expect(isPositiveInteger('6.0')).toBe(false)
})
test('6', () => {
  expect(isPositiveInteger('6')).toBe(true)
})
test('0', () => {
  expect(isPositiveInteger('0')).toBe(false)
})
