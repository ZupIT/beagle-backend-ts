import { createAction, coreNamespace } from '@zup-it/beagle-backend-core'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SubmitFormParams {}

/**
 * Attempts to submit the closest SimpleForm component. By "closest SimpleForm", understand the first ascendent in the
 * component tree with namespace "beagle" and name "simpleForm".
 *
 * If no validation errors are found, the onSubmit event of the form is triggered, otherwise, the event
 * onValidationError is.
 */
export const submitForm = createAction<SubmitFormParams>('submitForm', coreNamespace)
