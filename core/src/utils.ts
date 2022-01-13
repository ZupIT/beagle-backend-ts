import { ContextNode } from './model/context/context-node'
import { Operation } from './model/operation'

export const isDynamicExpression = (data: any) => data instanceof ContextNode || data instanceof Operation
