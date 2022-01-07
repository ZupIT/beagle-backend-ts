import { Operation } from '../model/operation'
import { DynamicExpression, Expression } from '../types'

type Element<T> = T extends (number | string | boolean) ? Expression<T> : DynamicExpression<T>

export const insert = <Type, ArrayType extends Type[], ExpressionType extends DynamicExpression<ArrayType>>(
  array: ExpressionType,
  element: Element<Type>,
  index: Expression<number> = 0,
) => new Operation<ArrayType>('insert', [array, element, index])

export const remove = <Type, ArrayType extends Type[], ExpressionType extends DynamicExpression<ArrayType>>(
  array: ExpressionType,
  element: Element<Type>,
) => new Operation<ArrayType>('remove', [array, element])

export const removeIndex = <ArrayType extends any[], ExpressionType extends DynamicExpression<ArrayType>>(
  array: ExpressionType,
  index: Expression<number> = 0,
) => new Operation<ArrayType>('removeIndex', [array, index])

export const contains = <Type, ArrayType extends Type[], ExpressionType extends DynamicExpression<ArrayType>>(
  array: ExpressionType,
  element: Element<Type>,
) => new Operation<boolean>('contains', [array, element])

/* The following function will always return any[] despite the type of the arrays passed as parameters. This is not
ideal, but I'm not sure if it's possible to correctly type it. The difficult lies in the fact that it can receive
any number of arrays to unite. */
export const union = (...arrays: DynamicExpression<any[]>[]) => new Operation<any[]>('union', arrays)
