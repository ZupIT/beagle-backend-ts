/**
 * Checks if a map contains any value different than null or undefined.
 *
 * @param map the map to look for values.
 * @returns true if the map contains any value, false otherwise.
 */
export const hasAnyValue = (map: Record<string, any>) => Object.values(map).some(v => v !== undefined && v !== null)
