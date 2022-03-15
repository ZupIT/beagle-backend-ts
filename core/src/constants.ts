/**
 * The namespace used by the core Beagle actions and the components in the package "@zup-it/beagle-backend-components".
 */
export const coreNamespace = 'beagle'

/**
 * The default namespace when no namespace is provided to an action or component.
 */
export const genericNamespace = 'custom'

/**
 * String expected by the hot reloading service (cli: start) for identifying a server restart.
 *
 * @privateRemarks this string must the same as the constant of same name declared in the module "cli".
 */
export const hotReloadingString = '__[HOT RELOADING: SERVER_STARTED]__'
