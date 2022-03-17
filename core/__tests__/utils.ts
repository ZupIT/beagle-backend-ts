import { map, mapValues, omitBy } from 'lodash'

/**
 * In the end, everything will become a JSON, so keys with undefined values don't make a difference. This helper
 * method removes all keys with undefined values recursively.
 *
 * @param data the object to remove undefined from
 * @returns a copy of the object, but without keys with undefined values
 */
export function omitUndefined<T>(data: T): T {
  if (!data || typeof data !=='object') return data
  if (Array.isArray(data)) return map(data, omitUndefined) as unknown as T
  return mapValues(omitBy(data as any, p => p === undefined), omitUndefined) as T
}
