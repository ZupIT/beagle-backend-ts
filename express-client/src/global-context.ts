import { createContextNode } from '@zup-it/beagle-backend-core'

export const getGlobalContext = <T>() => createContextNode<T>('globalContext')
