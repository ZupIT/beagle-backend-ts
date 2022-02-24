import { createContextNode } from './model/context/context-node'

/**
 * The Global Context is a Beagle Context that doesn't need to be declared and is available for the entire lifetime of
 * the application, i.e. if you set the a value in teh global context in Screen A, the value will be available in Screen
 * B. Furthermore, the values in the global context can also be set by the frontend application.
 *
 * We advise the developer to define the structure of the global context as an interface, so it can be safely accessed.
 * When retrieving the global context, use `getGlobalContext<T>()`, where T is the interface.
 *
 * @returns a reference to the Global Context.
 */
export const getGlobalContext = <T>() => createContextNode<T>('global')
