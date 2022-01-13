import { createAction, coreNamespace } from '@zup-it/beagle-backend-core'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SubmitFormParams {}

export const submitForm = createAction<SubmitFormParams>('submitForm', coreNamespace)
