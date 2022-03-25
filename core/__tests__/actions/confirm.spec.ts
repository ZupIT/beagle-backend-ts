import { Action, AnalyticsConfig } from 'src/model/action'
import { confirm, ConfirmParams } from 'src/actions'
import { expectActionToBeCorrect } from './utils'

const properties: ConfirmParams = {
  message: 'test message',
  title: 'test title',
  labelOk: 'hi',
  labelCancel: 'bye',
  onPressOk: new Action({ name: 'test ok' }),
  onPressCancel: new Action({ name: 'test cancel' }),
}

const analytics: AnalyticsConfig<ConfirmParams> = {
  additionalEntries: { test: 'test' },
  attributes: { message: true, title: true },
}

describe('Actions', () => {
  describe('confirm', () => {
    it('should create action', () => expectActionToBeCorrect(
      confirm({ ...properties, analytics }),
      'confirm',
      properties,
      analytics,
    ))

    it('should create action with only a message', () => expectActionToBeCorrect(
      confirm('test'),
      'confirm',
      { message: 'test' },
    ))
  })
})
