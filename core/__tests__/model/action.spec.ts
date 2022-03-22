import { omitBy } from 'lodash'
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

  it('should create action with only a name', () => {
    const action = new Action<MyActionParams>({ name: 'myAction' })
    expect(action).toEqual({ name: 'myAction' })
  })

  it('should create action factory with only a name', () => {
    const factory = createAction<MyActionParams>('myAction')
    const action = factory({ message: 'test' })
    expect(omitBy(action, p => !p)).toEqual({ name: 'myAction', properties: { message: 'test' } })
  })
})
