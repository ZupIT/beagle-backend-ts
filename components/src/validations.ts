import { logger, RootContext } from '@zup-it/beagle-backend-core'

export function validateColor(color?: any) {
  if (color instanceof RootContext) color = color.value
  if (typeof color !== 'string') return
  if (!color.match(/^#([\dA-Fa-f]{3}|[\dA-Fa-f]{4}|[\dA-Fa-f]{6}|[\dA-Fa-f]{8})$/)) {
    logger.warning(`Invalid color provided: ${color}`)
  }
}
