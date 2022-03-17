import { AnalyticsConfig } from 'src/model/action'
import { setContext, SetContextParams } from 'src/actions/set-context'
import { expectActionToBeCorrect } from './utils'

const properties: SetContextParams = {
  contextId: 'user',
  value: 18,
  path: 'age',
}

const analytics: AnalyticsConfig<SetContextParams> = {
  additionalEntries: { test: 'test' },
  attributes: { contextId: true, value: true, path: true },
}

describe('Actions: setContext', () => {
  it('should create action', () => expectActionToBeCorrect(
    setContext({ ...properties, analytics }),
    'setContext',
    properties,
    analytics,
  ))
})
