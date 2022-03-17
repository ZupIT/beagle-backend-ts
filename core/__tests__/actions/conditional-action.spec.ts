import { Action, AnalyticsConfig } from 'src/model/action'
import { conditionalAction, ConditionalActionParams } from 'src/actions'
import { ContextNode } from 'src/model/context/context-node'
import { expectActionToBeCorrect } from './utils'

const properties: ConditionalActionParams = {
  condition: new ContextNode<boolean>(''),
  onFalse: new Action({ name: 'test false' }),
  onTrue: new Action({ name: 'test true' }),
}

const analytics: AnalyticsConfig<ConditionalActionParams> = {
  additionalEntries: { test: 'test', hello: 'world' },
  attributes: { condition: true },
}

describe('Actions: condition', () => {
  it('should create action', () => expectActionToBeCorrect(
    conditionalAction({ ...properties, analytics }),
    'condition',
    properties,
    analytics,
  ))
})
