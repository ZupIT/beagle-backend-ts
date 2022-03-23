import { hasAnyValue } from 'src/utils/map'

describe('Utils: map', () => {
  describe('hasAnyValue', () => {
    it('map of undefineds should have no value', () => {
      expect(hasAnyValue({ a: undefined, b: undefined })).toBe(false)
    })

    it('map of nulls should have no value', () => {
      expect(hasAnyValue({ a: null, b: null })).toBe(false)
    })

    it('map with falsy values other than null or undefined should have value', () => {
      expect(hasAnyValue({ a: undefined, b: false })).toBe(true)
      expect(hasAnyValue({ a: undefined, b: 0 })).toBe(true)
      expect(hasAnyValue({ a: undefined, b: '' })).toBe(true)
    })

    it('map with truthy values should have value', () => {
      expect(hasAnyValue({ a: undefined, b: 1 })).toBe(true)
      expect(hasAnyValue({ a: undefined, b: 'test' })).toBe(true)
      expect(hasAnyValue({ a: undefined, b: [] })).toBe(true)
      expect(hasAnyValue({ a: undefined, b: {} })).toBe(true)
    })
  })
})
