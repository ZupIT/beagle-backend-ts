import { hotReloadingString } from './constants'
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

/**
 * Checks if the program is running in development mode.
 *
 * @returns true if `process.env.NODE_ENV` is unset or `"development"`
 */
export const isDevelopmentMode = () => process.env.NODE_ENV ?? 'development' === 'development'

/**
 * Enables hot reloading if the environment is development and if the program has started with the environment variable
 * `HOT_RELOADING=true`.
 *
 * This must be called as soon as the server becomes available.
 *
 * @example
 * If you're using express:
 * ```typescript
 * const expressApp = express()
 *
 * expressApp.listen(port, () => {
 *  console.log(`App listening at http://localhost:${port}`)
 *  setupHotReloading()
 * })
 * ```
 */
export function setupHotReloading() {
  if (isDevelopmentMode() && process.env.HOT_RELOADING == 'true') {
    process.stdout.write(
      `${hotReloadingString} if you're seeing this message, the hot reloading service has not started.`,
    )
  }
}
