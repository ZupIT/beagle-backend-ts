import { ContextNode, AnyContextNode } from '@zup-it/beagle-backend-core'

export const getGlobalContext = <T>() => new ContextNode('globalContext') as unknown as AnyContextNode<T>
