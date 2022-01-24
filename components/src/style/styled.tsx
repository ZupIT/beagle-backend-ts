import { BeagleJSX, FC, coreNamespace, Component } from '@zup-it/beagle-backend-core'
import { validateColor } from '../validations'
import { fromSimpleStyle } from './converter'
import { SimpleStyle } from './simple-styles'

export interface WithStyle {
  /**
   * The style for this component. Use it to customize the background, layout, borders, etc.
   */
  style?: SimpleStyle,
}

interface StyledComponentProps extends Component {
  /**
   * The style for this component. Use it to customize the background, layout, borders, etc.
   */
  style: WithStyle['style'],
}

/**
 * Use it to create components that supports the Beagle style protocol, based on the Yoga layout.
 *
 * @param props {@link StyledComponentProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const StyledComponent: FC<StyledComponentProps> = ({
  name,
  style,
  children,
  context,
  id,
  namespace,
  properties,
}) => {
  validateColor(style?.backgroundColor)
  validateColor(style?.borderColor)
  // @ts-ignore todo: actually implement jsx and check these errors. This Error is shown only when compiling.
  return (
    <component
      name={name}
      context={context}
      id={id}
      namespace={namespace}
      properties={{ ...fromSimpleStyle(style), ...properties }}
    >
      {children}
    </component>
  )
}

/**
 * Use it to create default components (in the namespace "beagle") that supports the Beagle style protocol, based on the
 * Yoga layout.
 *
 * @param props {@link StyledComponentProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const StyledDefaultComponent: FC<Omit<StyledComponentProps, 'namespace'>> = ({ children, ...props }) => (
  <StyledComponent {...props} namespace={coreNamespace}>{children}</StyledComponent>
)

type StyledSingleChildComponentProps =
  Omit<StyledComponentProps, 'children'> &
  {
    /**
     * This attribute will be used as children to make the usage on JSX easier, however, this attribute is for a single
     * child that will be serialized as an structure having "child" as property for it descendent instead of "children".
     */
    children: Component | undefined,
  }

/**
 * Use it to create default components (in the namespace "beagle") with a single child, that supports the Beagle style
 * protocol, based on the Yoga layout.
 *
 * WARNING: This component with a single child will be serialized as an structure having "child" as property for it
 * descendent instead of "children".
 *
 * @param props {@link StyledComponentProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const StyledSingleChildComponent: FC<Omit<StyledSingleChildComponentProps, 'namespace'>> =
 ({ children, ...props }) =>
  <StyledComponent
    {...{ ...props, properties: { ...props.properties, child: children } }}
    namespace={coreNamespace}
  />
