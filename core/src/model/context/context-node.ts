import { isEmpty } from 'lodash'
import { setContext, SetContextParams } from '../../actions/set-context'
import { Expression } from '../../types'
import { AnalyticsConfig, Action } from '../action'
import { AnyContextNode } from './types'

/**
 * For better typing, you should use `createContextNode<T>()` instead of `new ContextNode<T>()`. See
 * {@link createContextNode}.
 */
export class ContextNode<T> {
  constructor(readonly path: string) {}

  /**
   * @returns the Beagle Expression corresponding to this ContextNode
   */
  toString() {
    return `@{${this.path}}`
  }

  /**
   * This is a Beagle Action. It translates to the setContext action. Use this to change the value of this ContextNode.
   *
   * @param value the new value.
   * @param analytics optional. The metadata to generate an analytics record when this action runs.
   * @returns an instance of Action corresponding to a setContext for this ContextNode
   */
  set(value: Expression<T>, analytics?: AnalyticsConfig<SetContextParams<T>>): Action {
    const [, id, path] = this.path.match(/(\w+)\.?(.*)/) ?? []
    if (isEmpty(id)) throw new Error("Can't set context because context path is empty.")
    // @ts-ignore fixme: the analytics type is wrong, it wouldn't accept "route.url" for instance
    return setContext({ id, path, analytics, value })
  }

  at(index: number): ContextNode<any> {
    return new ContextNode(`${this.path}[${index}]`)
  }

  get(key: string): ContextNode<any> {
    return new ContextNode(`${this.path}.${key}`)
  }
}

/**
 * A Context in a Beagle application is a data structure used to store values at runtime. It is equivalent to variables
 * in a common programming language. It is important to remember that the context is only a reference, since the actual
 * value will be calculated in the front-end only, when running the server-driven screen.
 *
 * Attention: this should only be used for referring to the "globalContext", "navigationContext" or any implicit
 * context. To declare a new context, please use: `createContext` instead.
 *
 * Implicit contexts are generally used in actions or components, the sendRequest action, for instance, has the
 * onSuccess function, which receives an implicit context named "onSuccess" that is created by the action itself. This
 * context is considered implicit because it's not created by the developer. A component example is the list view, where
 * each iteration can be referred through a ContextNode named "item".
 *
 * You'll probably never need to create ContextNodes yourself unless you're creating a complex action or component.
 *
 * @param id the id of the context
 * @returns an instance of ContextNode
 */
export function createContextNode<T>(id: string): AnyContextNode<T> {
  return new ContextNode<T>(id) as any
}
