import { ActionProps } from '@zup-it/beagle-backend-core/model/action'
import { submitForm } from '../../src/actions/submit-form'
import { expectActionToBeCorrect } from './utils'

describe('Actions', () => {
  describe('submitForm', () => {
    const properties: ActionProps<Record<string, never>> = {}

    it('should create action', () => {
      expectActionToBeCorrect(submitForm(properties), 'submitForm', properties)
    })
  })
})
