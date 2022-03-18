import { Component, serialize } from 'src'

describe('Serializer: components', () => {
  it('should serialize leaf component', () => {
    const component = new Component({
      name: 'test',
      namespace: 'test-namespace',
      id: 'cp-id',
      properties: { a: 1, b: '2' },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized)).toEqual({
      _beagleComponent_: 'test-namespace:test',
      id: 'cp-id',
      a: 1,
      b: '2',
    })
  })

  it('should use default namespace', () => {
    const component = new Component({ name: 'test' })
    const serialized = serialize(component)
    expect(JSON.parse(serialized)._beagleComponent_).toBe('custom:test')
  })

  it('should serialize component with multiple children', () => {
    const component = new Component({
      name: 'test',
      namespace: 'a',
      children: [
        new Component({ name: 'another', namespace: 'a' }),
        new Component({ name: 'another', namespace: 'b' }),
      ],
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized)).toEqual({
      _beagleComponent_: 'a:test',
      children: [
        { _beagleComponent_: 'a:another' },
        { _beagleComponent_: 'b:another' },
      ],
    })
  })

  it('should transform single child into array', () => {
    const component = new Component({
      name: 'test',
      children: new Component({ name: 'another', namespace: 'a' }),
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).children).toEqual([{ _beagleComponent_: 'a:another' }])
  })

  it('should serialize component inside the properties of another component', () => {
    const component = new Component({
      name: 'test',
      properties: {
        fallback: new Component({ name: 'another', namespace: 'a' }),
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).fallback).toEqual({ _beagleComponent_: 'a:another' })
  })

  it('should serialize component with other components deep in its properties (array and map)', () => {
    const component = new Component({
      name: 'test',
      namespace: 'a',
      properties: {
        title: 'hey',
        ui: {
          date: '18/03/2022',
          templates: [
            {
              condition: true,
              value: new Component({
                name: 'template1',
                namespace: 'a',
                children: [
                  new Component({ name: 'cp1', namespace: 'a' }),
                  new Component({ name: 'cp1', namespace: 'a' }),
                ],
              }),
            },
            {
              condition: false,
              value: new Component({ name: 'template2', namespace: 'a' }),
            },
          ],
        },
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized)).toEqual({
      _beagleComponent_: 'a:test',
      title: 'hey',
      ui: {
        date: '18/03/2022',
        templates: [
          {
            condition: true,
            value: {
              _beagleComponent_: 'a:template1',
              children: [
                { _beagleComponent_: 'a:cp1' },
                { _beagleComponent_: 'a:cp1' },
              ],
            },
          },
          {
            condition: false,
            value: { _beagleComponent_: 'a:template2' },
          },
        ],
      },
    })
  })
})
