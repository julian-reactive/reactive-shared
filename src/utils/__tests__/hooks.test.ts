import { useLabel, usePreviousValue } from '../hooks'

xdescribe('usePreviousValue', () => {
  describe('pass the previousValue', () => {
    it('should return the object with the previousValue', () => {
      const expectedValue = undefined
      const value = usePreviousValue(undefined)

      expect(value).toEqual(expectedValue)
    })
  })
})

xdescribe('useLabel', () => {
  describe('when is string', () => {
    it('should return a string', () => {
      const expectedValue = ''
      const value = useLabel("Juancho")

      expect(value).toEqual(expectedValue)
    })
  })

  describe('when is function', () => {
    it('should return a function', () => {
      const expectedValue = ''
      const value = useLabel(() => 'Diegolas')

      expect(value).toEqual(expectedValue)
    })
  })

  describe('when there is other type of data', () => {
    it('should show an error', () => {
      const expectedValue = ''
      const value = useLabel(`1`)

      expect(value).toEqual(expectedValue)
    })
  })
})
