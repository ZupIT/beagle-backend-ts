import { Component, serialize } from 'src'
import { componentValidation } from 'src/validation'

jest.mock('src/validation', () => ({
  __esModule: true,
  componentValidation: {
    run: jest.fn(),
  },
}))

describe('Serializer: validation', () => {
  beforeEach(() => (componentValidation.run as jest.Mock).mockClear())

  it('should validate when environment is development', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    const component = new Component({ name: 'test' })
    serialize(component)
    expect(componentValidation.run).toHaveBeenCalledWith(component)
    process.env.NODE_ENV = env
  })

  it('should not validate when environment is not development', () => {
    const component = new Component({ name: 'test' })
    serialize(component)
    expect(componentValidation.run).not.toHaveBeenCalled()
  })
})
