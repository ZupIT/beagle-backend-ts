import { ContextNode } from './context-node'
import { AnyRootContext } from './types'

/**
 * For better typing, you should use `createContext<T>()` instead of `new RootContext<T>()`. See
 * {@link createContext}.
 */
export class RootContext<T> extends ContextNode<T> {
  constructor(id: string, value?: T) {
    super(id)
    this.value = value
  }

  /**
   * This will always be true and is just an trick for ensuring type-safety in Typescript. The intent here is guarantee
   * the type ContextNode is not assignable to RootContext.
   */
  isRoot = true
  readonly value?: T
}

/**
 * A Context in a Beagle application is a data structure used to store values at runtime. It is equivalent to variables
 * in a common programming language. It is important to remember that the context is only a reference, since the actual
 * value will be calculated in the front-end only, when running the server-driven screen.
 *
 * This is used to create a new local context for the current tree of components. A Context must be declared by using
 * the property "context" of a component. The scope of a context is only the component where it's declared and its
 * children, i.e. it's not accessible by any component outside this scope.
 *
 * Example 1: a counter
 * ```
 * const counter = createContext('counter', 0)
 *
 * const MyScreen = () => (
 *   <Container>
 *     <Text>{`The button was pressed ${counter} times`}</Text>
 *     <Button onPress={counter.set(sum(counter, 1))}>+1</Button>
 *   </Container>
 * )
 * ```
 *
 * Example 2: loading user data
 * ```
 * interface User {
 *   name: string,
 *   address: { street: string, number: string },
 * }
 *
 * const user = createContext<User>('user')
 *
 * const loadUser = sendRequest<User>({
 *   url: 'https://myapi.com/user/1',
 *   onSuccess: (response) => user.set(response.get('data')),
 * })
 *
 * const MyScreen = () => (
 *   <Container context={user} onInit={loadUser}>
 *     <Text>{`Username: ${user.get('name')}`}</Text>
 *     <Text>{`Address: ${user.get('address').get('street'), ${user.get('address').get('number')}`}</Text>
 *   </Container>
 * )
 * ```
 *
 * Attention: it is very important to specify the type of the context if no initial value is provided, i.e. `T` must
 * be set in `createContext<T>('id')`.
 *
 * @param id the id of the context, this is very important for debugging the application.
 * @returns an instance of RootContext
 */
export function createContext<T>(id: string, value?: T): AnyRootContext<T> {
  return new RootContext<T>(id, value) as any
}
