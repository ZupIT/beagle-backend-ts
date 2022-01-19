import { ContextNode } from './model/context/context-node'
import { Operation } from './model/operation'

/**
 * Verifies if the value passed as parameter is an instance of ContextNode or Operation. i.e. if it's a Beagle
 * expression.
 *
 * @param data the value to check
 * @returns true if data is an instance of ContextNode or Operation. False otherwise.
 */
export const isDynamicExpression = (data: any) => data instanceof ContextNode || data instanceof Operation
