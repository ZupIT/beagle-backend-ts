import { isEmpty } from 'lodash'
import { setContext } from '../../actions/set-context'
import { Expression } from '../../types'
import { AnalyticsConfig, ActionInterface } from '../action'

export class ContextNode<T> {
  constructor(readonly path: string) {}

  toString() {
    return `@{${this.path}}`
  }

  set(value: Expression<T>, analytics?: AnalyticsConfig<T>): ActionInterface {
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
