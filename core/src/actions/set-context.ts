import { createCoreAction } from './core-action'

interface SetContextParams {
  id: string,
  path?: string,
  value: any,
}

export const setContext = createCoreAction<SetContextParams>('setContext')
