import { BeagleJSX, FC, coreNamespace, Component } from '@zup-it/beagle-backend-core'
import { validateColor } from '../validations'
import { fromSimpleStyle } from './converter'
import { Style } from './simple-styles'

export interface WithStyle {
  /**
   * The style for this component. Use it to customize the background, layout, borders, etc.
   */
  style?: Style,
}

export interface StyledComponentProps extends Component {
  /**
   * The style for this component. Use it to customize the background, layout, borders, etc.
   */
  style: WithStyle['style'],
}

/**
 * Use it to create components that supports the Beagle style protocol, based on the Yoga layout.
 *
 * @category Components
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
      properties={{ style: fromSimpleStyle(style), ...properties }}
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
