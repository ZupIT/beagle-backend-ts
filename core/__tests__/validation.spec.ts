import { Component, componentValidation, ValidationFn } from 'src'

describe('Component validation', () => {
  const colorError = new Error('Invalid color format')
  const colorValidation: ValidationFn = (node) => {
    if (!node.properties?.color.match(/#(\d|[a-f]|[A-F]){6}/)) throw colorError
  }

  const ifThenError = new Error('then must be a child of if')
  const ifThenValidation: ValidationFn = (node) => {
    if (node.name === 'then' && node.parent?.name !== 'if') throw ifThenError
  }

  it('should add and remove validation function', () => {
    const fn = jest.fn()
    const component = new Component({ name: 'test' })
    const remove = componentValidation.add(fn)
    componentValidation.run(component)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(expect.objectContaining({ ...component, parent: undefined }))
    remove()
    componentValidation.run(component)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass validation of single component', () => {
    const remove = componentValidation.add(colorValidation)
    componentValidation.run(new Component({ name: 'test', properties: { color: '#000000' } }))
    remove()
  })

  it('should not pass validation of single component', () => {
    const remove = componentValidation.add(colorValidation)
    const component = new Component({ name: 'test', properties: { color: 'invalid' } })
    expect(() => componentValidation.run(component)).toThrow(colorError)
    remove()
  })

  it('should not pass validation of single child', () => {
    const tree = new Component({
      name: 'container',
      children: new Component({ name: 'text', properties: { color: 'invalid' } }),
    })
    const remove = componentValidation.add(colorValidation)
    expect(() => componentValidation.run(tree)).toThrow(colorError)
    remove()
  })

  it('should not pass validation of grand-children', () => {
    const tree = new Component({
      name: 'container',
      children: [
        new Component({ name: 'text', properties: { color: '#FFFFFF' } }),
        new Component({
          name: 'container',
          properties: { color: '#FFFFFF' },
          children: [
            new Component({ name: 'text', properties: { color: '#FFFFFF' } }),
            new Component({ name: 'text', properties: { color: 'invalid' } }),
          ],
        }),
      ],
    })
    const remove = componentValidation.add(colorValidation)
    expect(() => componentValidation.run(tree)).toThrow(colorError)
    remove()
  })

  it('should pass parent-child validation', () => {
    const tree = new Component({
      name: 'if',
      children: new Component({ name: 'then' }),
    })
    const remove = componentValidation.add(ifThenValidation)
    componentValidation.run(tree)
    remove()
  })

  it('should not pass parent-child validation', () => {
    const tree = new Component({
      name: 'container',
      children: new Component({ name: 'then' }),
    })
    const remove = componentValidation.add(ifThenValidation)
    expect(() => componentValidation.run(tree)).toThrow(ifThenError)
    remove()
  })
})
