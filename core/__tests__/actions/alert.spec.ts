import { Action, AnalyticsConfig } from 'src/model/action'
import { alert, AlertParams } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

const properties: AlertParams = {
  message: 'test message',
  title: 'test title',
  labelOk: 'hi',
  onPressOk: new Action({ name: 'test' }),
}

const analytics: AnalyticsConfig<AlertParams> = {
  additionalEntries: { test: 'test' },
  attributes: { message: true, title: true },
}

describe('Actions', () => {
  describe('alert', () => {
    it('should create action', () => expectActionToBeCorrect(
      alert({ ...properties, analytics }),
      'alert',
      properties,
      analytics,
    ))

    it('should create action with only a message', () => expectActionToBeCorrect(
      alert('test'),
      'alert',
      { message: 'test' },
    ))
  })
})
