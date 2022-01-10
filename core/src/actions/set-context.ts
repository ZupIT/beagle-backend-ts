import { Analytics } from '../model/action'
import { CoreAction } from './core-action'

interface SetContextParams<T> {
  id: string,
  path?: string,
  value: T,
}

export const setContext = <T>({ analytics, ...properties }: SetContextParams<T> & Analytics) => (
  new CoreAction({ name: 'setContext', properties, analytics })
)
