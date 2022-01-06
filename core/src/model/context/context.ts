import { isEmpty } from 'lodash'
import { SetContext } from '../../actions/set-context'
import { AnalyticsConfig } from '../action/types'
import { PrimitiveContext, MapContext, ArrayContext, AnyContext } from './types'

export class Context<T> implements PrimitiveContext<T>, MapContext<T>, ArrayContext<T> {
  constructor(path: string, value?: T) {
    this.path = path
    this.value = value
  }

  readonly path: string
  readonly value?: T

  toString() {
    return this.path
  }

  getIdAndPath() {
    const [, id, path] = this.path.match(/(\w+)\.?(.*)/) ?? []
    return { id, path }
  }

  set(value: T, analytics?: AnalyticsConfig<T>): SetContext<T> {
    const { id, path } = this.getIdAndPath()
    if (isEmpty(id)) throw new Error("Can't set context because context path is empty.")
    return new SetContext({ id, path, analytics, value })
  }

  // for ArrayContext
  at<I extends number>(index: I): T extends any[] ? AnyContext<T[I]> : never {
    return new Context(`${this.path}[${index}]`, Array.isArray(this.value) ? this.value[index] : undefined) as any
  }

  // for MapContext
  get<K extends keyof T>(key: K): AnyContext<T[K]> {
    return new Context(`${this.path}.${key}`, this.value === undefined ? undefined : this.value[key]) as any
  }
}
