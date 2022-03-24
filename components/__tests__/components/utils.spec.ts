import { createContextNode } from '@zup-it/beagle-backend-core'
import { sum } from '@zup-it/beagle-backend-core/operations'
import { childrenToInterpolatedText } from 'src/components/utils'

describe('Components utils', () => {
  describe('childrenToInterpolatedText', () => {
    it('should deal with strings', () => {
      expect(childrenToInterpolatedText('hello')).toBe('hello')
      expect(childrenToInterpolatedText(['hello ', 'world'])).toBe('hello world')
    })

    it('should deal with numbers', () => {
      expect(childrenToInterpolatedText(10)).toBe('10')
      expect(childrenToInterpolatedText([10, 20.52])).toBe('1020.52')
    })

    it('should deal with booleans', () => {
      expect(childrenToInterpolatedText(true)).toBe('true')
      expect(childrenToInterpolatedText([true, false])).toBe('truefalse')
    })

    it('should deal with objects', () => {
      const value1 = { a: 1, b: '2', c: true, d: { e: '3' } }
      const value2 = { hello: 'world' }
      expect(childrenToInterpolatedText(value1)).toBe(JSON.stringify(value1))
      expect(childrenToInterpolatedText([value1, value2])).toBe(`${JSON.stringify(value1)}${JSON.stringify(value2)}`)
    })

    it('should deal with expressions', () => {
      const ctx = createContextNode<number>('ctx')
      const op = sum(ctx, 2)
      expect(childrenToInterpolatedText(op)).toBe(op.toString())
      expect(childrenToInterpolatedText([op, ctx])).toBe(`${op.toString()}${ctx.toString()}`)
    })

    it('should deal with mixed types', () => {
      const ctx = createContextNode<number>('ctx')
      const values = ['1', 2, 3.58, true, false, 'test', ctx, { a: 1, b: '2' }]
      expect(childrenToInterpolatedText(values)).toBe(
        `123.58truefalsetest${ctx.toString()}${JSON.stringify(values[7])}`,
      )
    })
  })
})
