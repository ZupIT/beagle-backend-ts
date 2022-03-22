import { Operation } from 'src'
import { ContextNode } from 'src/model/context/context-node'
import { isDevelopmentMode, isDynamicExpression, setupHotReloading } from 'src/utils'

describe('Utils', () => {
  describe('isDevelopmentMode', () => {
    it('should be in development mode if the env variable is not set', () => {
      const currentMode = process.env.NODE_ENV
      delete process.env.NODE_ENV
      expect(isDevelopmentMode()).toBe(true)
      process.env.NODE_ENV = currentMode
    })

    it('should be in development mode if the env variable is "development"', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      expect(isDevelopmentMode()).toBe(true)
      process.env.NODE_ENV = currentMode
    })

    it('should not be in development mode', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      expect(isDevelopmentMode()).toBe(false)
      process.env.NODE_ENV = currentMode
    })
  })

  describe('isDynamicExpression', () => {
    it('should return true if parameter is a ContextNode', () => {
      const ctx = new ContextNode('ctx')
      expect(isDynamicExpression(ctx)).toBe(true)
    })

    it('should return true if parameter is an Operation', () => {
      const op = new Operation('op', [1, 2])
      expect(isDynamicExpression(op)).toBe(true)
    })

    it('should return false for any other type', () => {
      expect(isDynamicExpression('hi')).toBe(false)
      expect(isDynamicExpression(10)).toBe(false)
      expect(isDynamicExpression(true)).toBe(false)
      expect(isDynamicExpression([1, 2])).toBe(false)
      expect(isDynamicExpression({ id: 'ctx' })).toBe(false)
      expect(isDynamicExpression({ _: null, name: 'op', args: [1, 2] })).toBe(false)
    })
  })

  describe('setupHotReloading', () => {
    const originalWrite = process.stdout.write
    process.stdout.write = jest.fn()

    beforeEach(() => (process.stdout.write as jest.Mock).mockClear())

    afterAll(() => process.stdout.write = originalWrite)

    it('should not setup hot reloading if environment is not "development"', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      process.env.HOT_RELOADING = 'true'
      setupHotReloading()
      expect(process.stdout.write).not.toHaveBeenCalled()
      process.env.NODE_ENV = currentMode
    })

    it('should not setup hot reloading if the env variable "HOT_RELOADING" is not true', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      delete process.env.HOT_RELOADING
      setupHotReloading()
      expect(process.stdout.write).not.toHaveBeenCalled()
      process.env.NODE_ENV = currentMode
    })

    it('should setup hot reloading', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      process.env.HOT_RELOADING = 'true'
      setupHotReloading()
      expect(process.stdout.write).toHaveBeenCalledWith(expect.stringMatching(/^__\[HOT RELOADING: SERVER_STARTED\]__/))
      process.env.NODE_ENV = currentMode
    })
  })
})
