import { DynamicExpression } from '../../types'

/**
 * Any value that is acceptable as an Operation argument.
 */
export type ValidOperationAttribute = DynamicExpression<any> | number | string | boolean | undefined | null
