import { formatToMoney, formatToPhone, formatToNumber } from '../utils'

describe('formatToNumber', () => {
  describe('when value is number', () => {
    it('it should return the formatted number', () => {
      const expectedValue = '1.000.000'
      const value = formatToNumber(1000000)

      expect(value).toEqual(expectedValue)
    })
  })

  describe('when value is string', () => {
    it('it should return the formatted number', () => {
      const expectedValue = '1.000.000'
      const value = formatToNumber('1000000')

      expect(value).toEqual(expectedValue)
    })
  })

  describe('when value is decimal', () => {
    it('it should return the formatted number', () => {
      const expectedValue = '3.141.51'
      const value = formatToNumber(3141.51)

      expect(value).toEqual(expectedValue)
    })
  })
})

describe('formatToMoney', () => {
  it('should put a space in the value', () => {
    const expectedValue = '$ 1.000'
    const value = formatToMoney(1000)

    expect(value).toEqual(expectedValue)
  })

  describe('when spacing is false', () => {
    it('should NOT put a space in the value', () => {
      const expectedValue = '$100'
      const value = formatToMoney(100, false)

      expect(value).toEqual(expectedValue)
    })
  })
})

describe('formatToPhone', () => {
  describe('when the value is a 10 digit number', () => {
    it('should put the number into three parts', () => {
      const expectedValue = '315 231 2233'
      const value = formatToPhone('3152312233')

      expect(value).toEqual(expectedValue)
    })
  })
})
