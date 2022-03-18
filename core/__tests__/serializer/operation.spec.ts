import { Component, Operation, serialize } from 'src'
import { ContextNode } from 'src/model/context/context-node'

describe('Serializer: operations', () => {
  it('should serialize an operation', () => {
    const age = new ContextNode('user.age')
    const isUnderAge = new Operation('lt', [age, 18])
    const component = new Component({ name: 'test', properties: { isUnderAge } })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).isUnderAge).toEqual('@{lt(user.age, 18)}')
  })

  it('should serialize deep references to operations (array and map)', () => {
    const name = new ContextNode('user.name')
    const age = new ContextNode('user.age')
    const id = new ContextNode('user.documents[0]')
    const formattedName = new Operation('capitalizeWords', [name])
    const ageText = new Operation('concat', [age, ' years old'])
    const formattedId = new Operation('formatDocument', [id, 'ssn'])
    const component = new Component({
      name: 'test',
      properties: {
        names: [formattedName],
        documents: { id: formattedId },
        a: { b: [1, 2, { c: [ageText, 10] }] },
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).names).toEqual(['@{capitalizeWords(user.name)}'])
    expect(JSON.parse(serialized).documents).toEqual({ id: "@{formatDocument(user.documents[0], 'ssn')}" })
    expect(JSON.parse(serialized).a).toEqual({ b: [1, 2, { c: ["@{concat(user.age, ' years old')}", 10] }] })
  })
})
