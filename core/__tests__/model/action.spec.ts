import { Action, createAction } from 'src/model/action'

interface MyActionParams {
  message: string,
}

describe('Action', () => {
  it('should create action', () => {
    const action = new Action<MyActionParams>({
      name: 'myAction',
      analytics: { additionalEntries: { test: 'test' }, attributes: { message: true } },
      namespace: 'namespace',
      properties: { message: 'test' },
    })

    expect(action).toEqual({
      name: 'myAction',
      analytics: { additionalEntries: { test: 'test' }, attributes: { message: true } },
      namespace: 'namespace',
      properties: { message: 'test' },
    })
  })

  it('should create action factory', () => {
    const factory = createAction<MyActionParams>('myAction', 'namespace')
    const action = factory({
      message: 'test',
      analytics: { additionalEntries: { test: 'test' }, attributes: { message: true } },
    })
    expect(action).toEqual({
      name: 'myAction',
      analytics: { additionalEntries: { test: 'test' }, attributes: { message: true } },
      namespace: 'namespace',
      properties: { message: 'test' },
    })
  })

  it('should create action without namespace', () => {
    const action = new Action<MyActionParams>({ name: 'myAction' })
    expect(action.namespace).toBeUndefined()
  })

  it('should create action factory without namespace', () => {
    const factory = createAction<MyActionParams>('myAction')
    const action = factory({ message: 'test' })
    expect(action.namespace).toBeUndefined()
  })
})
