export { Component } from './model/component'
export { Expression, HttpMethod } from './types'
export { RootContext } from './model/context/root-context'
export { coreNamespace } from './constants'
export { Actions, Analytics } from './model/action'
export { AnyContextNode } from './model/context/types'
export { ContextNode } from './model/context/context-node'
export { createContext } from './model/context'
export { serialize } from './serializer'
export { FC, ComponentProps } from './jsx/types'
export { logger } from './logger'
export { React } from './jsx'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface ElementChildrenAttribute {
      children: 'children',
    }

    interface IntrinsicElements {
      component: import('./model/component').ComponentInterface,
    }
  }
}
