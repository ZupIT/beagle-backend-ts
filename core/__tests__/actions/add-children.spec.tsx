import { BeagleJSX } from 'src'
import { AnalyticsConfig } from 'src/model/action'
import { addChildren, AddChildrenParams } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

const properties: AddChildrenParams = {
  componentId: 'test',
  value: [<>Hello World</>],
  mode: 'APPEND',
}

const analytics: AnalyticsConfig<AddChildrenParams> = {
  additionalEntries: { test: 'test' },
  attributes: { componentId: true },
}

describe('Actions: addChildren', () => {
  it('should create action', () => expectActionToBeCorrect(
    addChildren({ ...properties, analytics }),
    'addChildren',
    properties,
    analytics,
  ))
})
