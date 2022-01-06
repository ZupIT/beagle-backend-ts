import { CoreAction } from './core-action'

interface SetContextParams<T> {
  id: string,
  path?: string,
  value: T,
}

export class SetContext<T> extends CoreAction<SetContextParams<T>> {}
