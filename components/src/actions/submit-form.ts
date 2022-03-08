import { createAction, coreNamespace } from '@zup-it/beagle-backend-core'

/**
 * Attempts to submit the closest SimpleForm component. By "closest SimpleForm", understand the first ascendent in the
 * component tree with namespace "beagle" and name "simpleForm".
 *
 * If no validation errors are found, the onSubmit event of the form is triggered, otherwise, the event
 * onValidationError is.
 *
 * @category Actions
 */
export const submitForm = createAction<Record<string, never>>('submitForm', coreNamespace)
