import { LocalContext } from './context/types'

export interface WithContext {
  /**
   * A Context that will be made available for this Component and its children.
   *
   * This must be a RootContext, created via the function `createContext`. Contexts like the global context, the
   * navigation contexts or implicit contexts don't need to be declared and won't be accepted here.
   */
  context?: LocalContext<any>,
}

export interface WithChildren {
  /**
   * The children of this Component. This must be a single Component or an array of Components.
   */
  children?: Component | Component[] | null,
}

/**
 * The Component is Beagle's main structure. It is a node in the UI tree the backend returns to the frontend.
 *
 * Among the default components provided by Beagle (@zup-it/beagle-backend-components), there are: Container,
 * ScrollView, ListView, Button and Text.
 *
 * The Components are the basic structure we use to build a view and we use JSX to declare them, i.e. this class should
 * never be used by the developer to instantiate a new component.
 *
 * To use a component, just use its JSX form:
 * ```tsx
 * <Container>
 *   <Text>Hello World!</Text>
 * <Container>
 * ```
 *
 * To define a new component, use the single intrinsic element: `<component />`:
 *
 * ```tsx
 * interface MyCustomTextProps {
 *   children: string,
 *   fontFamily: string,
 *   color: string,
 *   size: string,
 * }
 *
 * export const MyCustomText: FC<MyCustomTextProps> = ({ children, id, ...other }) => (
 *   <component name="my-custom-text" namespace="custom" id={id} properties={{ ...other, text: children }} />
 * )
 * ```
 *
 * To know more about the properties of `<component />`, check {@link ComponentInterface}.
 */

export interface Component extends WithContext, WithChildren {
  /**
   * An optional id for this component.
   * This is important for debugging or for identifying it in structures like the Action addChildren.
  */
  id?: string,
  /**
   * All the properties for this Component.
   */
  properties?: Record<string, any>,
  /**
   * The name of the Component. Every Component type is identified in the front-end by a string in the format
   * "$namespace:$name". The Container, for instance is a "beagle:container".
   */
  name: string,
  /**
   * The namespace of the Component. Every Component type is identified in the front-end by a string in the format
   * "$namespace:$name". The Container, for instance is a "beagle:container".
   */
  namespace?: string,
}
export class Component {
  /**
   * @param options the component parameters: properties, children, context, id, name and namespace. See
   * {@link ComponentInterface}.
   */
  constructor({ properties, children, context, id, name, namespace }: Component) {
    this.id = id
    this.children = children
    this.context = context
    this.properties = properties
    this.name = name
    this.namespace = namespace
  }
}
