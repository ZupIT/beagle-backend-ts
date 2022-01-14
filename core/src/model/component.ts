import { AnyRootContext } from './context/types'

export interface WithContext {
  context?: AnyRootContext<any>,
}

export interface WithChildren {
  children?: Component | Component[],
}

interface ComponentInterface extends WithContext, WithChildren {
  id?: string,
  properties?: Record<string, any>,
  name: string,
  namespace?: string,
}

export class Component implements ComponentInterface {
  constructor({ properties, children, context, id, name, namespace }: ComponentInterface) {
    this.id = id
    this.children = children
    this.context = context
    this.properties = properties
    this.name = name
    this.namespace = namespace
  }

  namespace?
  id?
  name
  children?
  context?
  properties?
}
