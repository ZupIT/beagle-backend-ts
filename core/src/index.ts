export { Component, WithContext, WithChildren } from './model/component'
export { Expression, HttpMethod, DynamicExpression } from './types'
export { RootContext } from './model/context/root-context'
export { coreNamespace } from './constants'
export { Actions, WithAnalytics, createAction } from './model/action'
export { AnyContextNode } from './model/context/types'
export { createContextNode } from './model/context/context-node'
export { createContext } from './model/context/root-context'
export { serialize } from './serializer'
export { FC, ComponentProps } from './jsx/types'
export { logger } from './logger'
export { isDynamicExpression } from './utils'
export { BeagleJSX, setFragmentFactory } from './jsx'
import { Component } from './model/component'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    /**
     * A JSX element is equivalent to an instance of the class Component.
     */
    type Element = Component

    interface ElementChildrenAttribute {
      children: 'children',
    }

    interface IntrinsicElements {
      /**
       * `<component />` is used to reference a component in the frontend, but instead of using it directly when
       * building the screen, we advise creating a strictly typed functional component that is easier to use. See the
       * example below:
       *
       * ```
       * interface MyCustomTextProps {
       *   children: string,
       *   fontFamily: string,
       *   color: string,
       *   size: string,
       * }
       *
       * export const MyCustomText: FC<MyCustomTextProps> = ({ children, id, ...other }) => (
       *   <component
       *     name="my-custom-text"
       *     namespace="custom"
       *     id={id}
       *     properties={{ ...other, text: children }}
       *   />
       * )
       * ```
       *
       * Then, when building your screen:
       * ```
       * const MyScreen = () => (
       *   <MyCustomText color="#000">Hello World</MyCustomText>
       * )
       * ```
       *
       * This JSX element is equivalent to the class {@link Component}. Read it's documentation for details on each
       * attribute.
       *
       * To see more examples of component declarations, please check the components implemented in the package
       * "@zup-it/beagle-backend-components".
       */
      component: Element,
    }
  }
}
