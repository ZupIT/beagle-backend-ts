import { Component, serialize } from 'src'
import { RootContext } from 'src/model/context/root-context'
import { ContextNode } from 'src/model/context/context-node'

describe('Serializer: context', () => {
  it('should declare local context', () => {
    const ctx = new RootContext('ctx')
    const component = new Component({ name: 'test', context: ctx })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).context).toEqual({ id: 'ctx' })
  })

  it('should declare local context with initial value', () => {
    const ctx = new RootContext('ctx', { a: 1, b: '2' })
    const component = new Component({ name: 'test', context: ctx })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).context).toEqual({ id: 'ctx', value: { a: 1, b: '2' } })
  })

  it('should serialize references to contexts', () => {
    const name = new ContextNode('user.name')
    const component = new Component({ name: 'test', properties: { name } })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).name).toEqual('@{user.name}')
  })

  it('should serialize deep references to contexts (array and map)', () => {
    const name = new ContextNode('user.name')
    const age = new ContextNode('user.age')
    const id = new ContextNode('user.documents[0]')
    const component = new Component({
      name: 'test',
      properties: {
        names: [name],
        documents: { id },
        a: { b: [1, 2, { c: [age, 10] }] },
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).names).toEqual(['@{user.name}'])
    expect(JSON.parse(serialized).documents).toEqual({ id: '@{user.documents[0]}' })
    expect(JSON.parse(serialized).a).toEqual({ b: [1, 2, { c: ['@{user.age}', 10] }] })
  })
})
