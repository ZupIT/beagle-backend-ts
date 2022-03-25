import { Component } from 'src'
import { AnalyticsConfig } from 'src/model/action'
import { addChildren, AddChildrenParams } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

const properties: AddChildrenParams = {
  componentId: 'test',
  value: [new Component({ name: 'test' })],
  mode: 'APPEND',
}

const analytics: AnalyticsConfig<AddChildrenParams> = {
  additionalEntries: { test: 'test' },
  attributes: { componentId: true },
}

describe('Actions', () => {
  describe('addChildren', () => {
    it('should create action', () => expectActionToBeCorrect(
      addChildren({ ...properties, analytics }),
      'addChildren',
      properties,
      analytics,
    ))
  })
})
