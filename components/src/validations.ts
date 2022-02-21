/**
 * Validates if the argument represents a color, i.e., if it's a string in the formar #RGB, #RGBA, #RRGGBB or #RRGGBBAA.
 *
 * If the argument is not a color, a warning is logged.
 *
 * @param color the value to check.
 */
export function validateColor(color?: any) {
  if (typeof color !== 'string') return
  if (!color.match(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{4}|[\dA-Fa-f]{6}|[\dA-Fa-f]{8})$/)) {
    throw new Error(
      `Invalid color: ${color}. The expected formats are #RGB, #RGBA, #RRGGBB or #RRGGBBAA, where R, G, B and A are hexadecimal characters representing the amount of red, green, blue and opacity, respectively.`,
    )
  }
}
