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

type SingleChildComponentProps =
  Omit<Component, 'children'> &
  {
    /**
     * This attribute will be used as children to make the usage on JSX easier, however, this attribute is for a single
     * child that will be serialized as an structure having "child" as property for it descendent instead of "children".
     */
    children: Component | undefined,
  }

/**
 * Use it to create default components (in the namespace "beagle"), with a single child.
 *
 * WARNING: This component with a single child will be serialized as an structure having "child" as property for it
 * descendent instead of "children".
 *
 * @param props {@link Component}.
 * @returns JSX element, i.e an instance of Component.
 */
export const SingleChildComponent: FC<Omit<SingleChildComponentProps, 'namespace'>> = ({ children, ...other }) => (
  <component {...{ ...other, properties: { ...other.properties, child: children } }} namespace={coreNamespace} />
)
