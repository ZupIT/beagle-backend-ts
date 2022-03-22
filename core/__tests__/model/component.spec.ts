import { RootContext } from 'src/model/context/root-context'
import { Component } from 'src/model/component'

describe('Component', () => {
  it('should create Component', () => {
    const component = new Component({
      name: 'component',
      children: [new Component({ name: 'test' })],
      context: new RootContext('ctx'),
      id: 'component-id',
      namespace: 'test',
      properties: { prop: 1 },
    })

    expect(component).toEqual({
      name: 'component',
      children: [new Component({ name: 'test' })],
      context: new RootContext('ctx'),
      id: 'component-id',
      namespace: 'test',
      properties: { prop: 1 },
    })
  })

  it('should create component with only a name', () => {
    const component = new Component({ name: 'component' })
    expect(component).toEqual({ name: 'component' })
  })
})
