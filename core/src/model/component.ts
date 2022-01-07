import { lowerFirst } from 'lodash'
import { genericNamespace } from '../constants'
import { AnyRootContext } from './context/types'

interface BaseConstructorArgs {
  id?: string,
  children?: Component<any>[],
  context?: AnyRootContext<any>,
}

interface ConstructorArgsWithProperties<Props> extends BaseConstructorArgs {
  properties: Props,
}

export type ComponentConstructor<Props> = Props extends void
  ? BaseConstructorArgs
  : ConstructorArgsWithProperties<Props>

export abstract class Component<Props = void> {
  constructor(data: ComponentConstructor<Props>) {
    this.id = data.id
    this.children = data.children
    this.context = data.context
    this.properties = (data as ConstructorArgsWithProperties<Props>).properties
    this.name ??= lowerFirst(this.constructor.name)
  }

  namespace = genericNamespace
  id?: string
  name: string
  children?: Component<any>[]
  context?: AnyRootContext<any>
  properties: Props
}
