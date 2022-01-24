import { createCoreAction } from './core-action'

export interface SetContextParams<T = any> {
  /**
   * The id of the context to change.
   */
  id: string,
  /**
   * The path of the property to change. If left blank, the entire structure will be changed.
   */
  path?: string,
  /**
   * The new value.
   */
  value: T,
}

/**
 * Sets a value in the given context. Prefer using the method set of your instance of ContextNode instead of this.
 *
 * @param options the parameters for the setContext action: id, path and value. See {@link SetContextParams}.
 * @returns an instance of Action.
 */
export const setContext = createCoreAction<SetContextParams>('setContext')
