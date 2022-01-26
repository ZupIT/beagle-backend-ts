import { logger } from '@zup-it/beagle-backend-core'

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
    logger.warning(`Invalid color provided: ${color}`)
  }
}
