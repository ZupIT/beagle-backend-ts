import { Expression } from '..'
import { Operation } from '../model/operation'

/**
 * Converts the passed value (`string` or `number`) to `int`
 * `int` as a `number` with no decimal places.
 *
 * Example a: `int('3.2')` results in `3`.
 * Example b: `int(6.692)` results in `6`.
 * Example c: `int('test')` results in `NaN`.
 *
 * @param values the value to be casted to `int`.
 * @returns an instance of `Operation<number>`, i.e. an operation that results in a `number` when run by the frontend.
 */
export const int = (value: Expression<string> | Expression<number>) => new Operation<number>('int', [value])

/**
 * Converts the passed value (`string` or `number`) to `double`
 * `double` as a `number` with decimal places.
 *
 * Example a: `double('3.2')` results in `3.2`.
 * Example b: `double(6.692)` results in `6.692`.
 * Example c: `double('test')` results in `NaN`.
 *
 * @param values the value to be casted to `double`.
 * @returns an instance of `Operation<number>`, i.e. an operation that results in a `number` when run by the frontend.
 */
export const double = (value: Expression<string> | Expression<number>) => new Operation<number>('double', [value])

/**
 * Converts the passed value (`number`) to `string`
 *
 * Example a: `string(3)` results in `'3'`.
 * Example b: `string(6.692)` results in `'6.692'`.
 *
 * @param values the value to be casted to `string`.
 * @returns an instance of `Operation<string>`, i.e. an operation that results in a `string` when run by the frontend.
 */
export const string = (value: Expression<number>) => new Operation<string>('string', [value])
