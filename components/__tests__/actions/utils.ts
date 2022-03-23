import { omitBy } from 'lodash'
import { coreNamespace } from '@zup-it/beagle-backend-core'
import { Action, AnalyticsConfig } from '@zup-it/beagle-backend-core/model/action'

export function expectActionToBeCorrect(
  action: Action,
  name: string,
  properties: unknown = {},
  analytics?: AnalyticsConfig<unknown>,
) {
  expect(action).toBeInstanceOf(Action)
  expect(action.name).toBe(name)
  expect(action.namespace).toBe(coreNamespace)
  const validProperties = omitBy(action.properties, value => value === undefined)
  expect(validProperties).toEqual(properties)
  expect(action.analytics).toEqual(analytics)
}
