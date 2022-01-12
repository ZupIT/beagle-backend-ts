import { createCoreAction } from './core-action'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SubmitFormParams {}

export const submitForm = createCoreAction<SubmitFormParams>('submitForm')
