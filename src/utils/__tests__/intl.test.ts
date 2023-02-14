import { onlyText, initLangCode } from '../intl'

describe('initLangCode', () => {
  describe('pass the translations', () => {
    it('should return the object with the translations', () => {
      const expectedValue = undefined
      const value = initLangCode({ GENERAL: { OK: 'OK', TEST: 'testing ${TEST}' } })

      expect(value).toEqual(expectedValue)
    })
  })
})

describe('onlyText', () => {
  describe('when the value does not exist', () => {
    it('should put message inside #', () => {
      const expectedValue = '##GENERAL.ERROR##'
      const value = onlyText('GENERAL.ERROR')

      expect(value).toEqual(expectedValue)
    })
  })

  describe('when the value exists', () => {
    it('should put the message', () => {
      const expectedValue = 'OK'
      const value = onlyText('GENERAL.OK')

      expect(value).toEqual(expectedValue)
    })
  })

  describe('changing replace', () => {
    // describe('when replace object is not an object', () => {
    //   it('should throw an error', () => {
    //     expect(onlyText('GENERAL.TEST', 'not-object')).toThrowError()
    //   })
    // })

    it('add var test in json', () => {
      const expectedValue = 'testing test'
      const value = onlyText('GENERAL.TEST', { TEST: 'test' })

      expect(value).toEqual(expectedValue)
    })
  })
})
