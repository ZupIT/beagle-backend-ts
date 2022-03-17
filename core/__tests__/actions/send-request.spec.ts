import { Action, AnalyticsConfig } from 'src/model/action'
import { MapContextNode } from 'src/model/context/types'
import { ContextNode } from 'src/model/context/context-node'
import { sendRequest, SendRequestParams, request, ResponseContext, ErrorContext } from 'src/actions/send-request'
import { expectActionToBeCorrect } from './utils'

interface User {
  id: string,
  name: string,
  document: string,
  age: number,
}

interface CompositeOptions {
  id: string,
  user: Omit<User, 'id'>,
}

const properties: SendRequestParams<User> = {
  url: 'https://my-api.com/resource',
  data: { id: 1, name: 'test' },
  headers: { test: 'test' },
  method: 'put',
  onError: response => new Action({
    name: 'test-error',
    properties: { message: response.get('message') },
  }),
  onSuccess: response => new Action({
    name: 'test-success',
    properties: {
      id: response.get('data').get('id'),
      name: response.get('data').get('name'),
    },
  }),
  onFinish: new Action({ name: 'test-finish' }),
}

const analytics: AnalyticsConfig<SendRequestParams> = {
  additionalEntries: { test: 'test' },
  attributes: { url: true },
}

describe('Actions: sendRequest', () => {
  it('should create action', () => {
    const processed = {
      ...properties,
      onSuccess: properties.onSuccess!(new ContextNode('onSuccess') as MapContextNode<ResponseContext<User>>),
      onError: properties.onError!(new ContextNode('onError') as MapContextNode<ErrorContext<unknown>>),
    }
    expectActionToBeCorrect(
      sendRequest({ ...properties, analytics }),
      'sendRequest',
      processed,
      analytics,
    )
  })

  it('should compose sendRequest', () => {
    const updateUser = request<User>()
      .compose(({ id, user }: CompositeOptions) => ({ url: `https://api.com/user/${id}`, method: 'put', data: user }))

    const properties: Parameters<typeof updateUser>[0] = {
      id: '1',
      user: {
        age: 19,
        document: '000',
        name: 'John',
      },
      onSuccess: response => new Action({
        name: 'test',
        properties: {
          name: response.get('data').get('name'),
        },
      }),
      analytics: false,
    }

    const processed = {
      url: 'https://api.com/user/1',
      method: 'put',
      data: properties.user,
      onSuccess: properties.onSuccess!(new ContextNode('onSuccess') as MapContextNode<ResponseContext<User>>),
    }

    expectActionToBeCorrect(
      updateUser(properties),
      'sendRequest',
      processed,
      false,
    )
  })
})
