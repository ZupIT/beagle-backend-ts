import { Component, Operation, serialize } from 'src'
import { ContextNode } from 'src/model/context/context-node'
import { Action } from 'src/model/action'

describe('Serializer: actions', () => {
  it('should serialize actions', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [
          new Action({ name: 'alert', namespace: 'a', properties: { message: 'hi' } }),
          new Action({ name: 'log', namespace: 'a', properties: { text: '[INFO] hi!' } }),
        ],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress).toEqual([
      { _beagleAction_: 'a:alert', message: 'hi' },
      { _beagleAction_: 'a:log', text: '[INFO] hi!' },
    ])
  })

  it('should use default namespace', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [new Action({ name: 'alert' })],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress).toEqual([
      { _beagleAction_: 'custom:alert' },
    ])
  })

  it('should serialize a single action into an array', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: new Action({ name: 'alert', namespace: 'a', properties: { message: 'hi' } }),
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress).toEqual([
      { _beagleAction_: 'a:alert', message: 'hi' },
    ])
  })

  it('should serialize analytics with simple attribute map', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [new Action({
          name: 'alert',
          analytics: {
            additionalEntries: { userId: '001' },
            attributes: { message: true, route: true },
          },
        })],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress[0].analytics).toEqual(
      { additionalEntries: { userId: '001' }, attributes: ['message', 'route'] },
    )
  })

  it('should serialize analytics with complex attribute map', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [new Action({
          name: 'alert',
          analytics: {
            attributes: { route: { domain: true, port: true }, a: { b: { c: { d: true }, e: true, f: true } } },
          },
        })],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress[0].analytics.attributes).toIncludeSameMembers(
      ['route.domain', 'route.port', 'a.b.c.d', 'a.b.e', 'a.b.f'],
    )
  })

  it('should serialize analytics "false"', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [new Action({
          name: 'alert',
          analytics: false,
        })],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress[0].analytics).toBe(false)
  })

  it('should serialize sub-actions (shallow and deep)', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [
          new Action({
            name: 'confirm',
            namespace: 'a',
            properties: {
              onPressOk: [
                new Action({
                  name: 'sendRequest',
                  namespace: 'a',
                  properties: {
                    test: {
                      onSuccess: [
                        new Action({ name: 'alert', namespace: 'a', properties: { message: 'success' } }),
                      ],
                    },
                  },
                }),
              ],
            },
          }),
        ],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress).toEqual([{
      _beagleAction_: 'a:confirm',
      onPressOk: [{
        _beagleAction_: 'a:sendRequest',
        test: {
          onSuccess: [
            { _beagleAction_: 'a:alert', message: 'success' },
          ],
        },
      }],
    }])
  })

  it('should serialize contexts and operations in an action (shallow and deep)', () => {
    const username = new ContextNode('user.name')
    const age = new ContextNode('user.age')
    const isAdult = new Operation('gt', [age, 18])
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [
          new Action({
            name: 'alert',
            properties: {
              message: username,
              display: isAdult,
            },
          }),
        ],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress[0].message).toEqual('@{user.name}')
    expect(JSON.parse(serialized).onPress[0].display).toEqual('@{gt(user.age, 18)}')
  })

  it('should serialize components in an action (shallow and deep)', () => {
    const component = new Component({
      name: 'test',
      properties: {
        onPress: [
          new Action({
            name: 'an-action',
            properties: {
              overlay: new Component({ name: 'test', namespace: 'a' }),
              a: { b: { c: [new Component({ name: 'test', namespace: 'b' })] } },
            },
          }),
        ],
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).onPress[0].overlay).toEqual({ _beagleComponent_: 'a:test' })
    expect(JSON.parse(serialized).onPress[0].a.b.c[0]).toEqual({ _beagleComponent_: 'b:test' })
  })

  it('should serialize deep actions inside components (array and map)', () => {
    const component = new Component({
      name: 'test',
      properties: {
        a: {
          b: {
            c: {
              d: [new Action({ name: 'test', namespace: 'a' })],
            },
            e: [1, 2, 3, { f: [new Action({ name: 'test', namespace: 'b' })] }],
          },
        },
      },
    })
    const serialized = serialize(component)
    expect(JSON.parse(serialized).a.b.c.d[0]).toEqual({ _beagleAction_: 'a:test' })
    expect(JSON.parse(serialized).a.b.e[3].f[0]).toEqual({ _beagleAction_: 'b:test' })
  })
})
