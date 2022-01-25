import { BeagleJSX, FC, coreNamespace, Component } from '@zup-it/beagle-backend-core'

/**
 * Use it to create default components (in the namespace "beagle").
 *
 * @param props {@link Component}.
 * @returns JSX element, i.e an instance of Component.
 */
export const DefaultComponent: FC<Omit<Component, 'namespace'>> = ({ children, ...other }) => (
  <component {...other} namespace={coreNamespace}>{children}</component>
)
