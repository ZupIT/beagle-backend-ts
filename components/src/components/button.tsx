import { BeagleJSX, Actions, FC, Expression } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'
import { InterpolatedText } from './types'
import { childrenToInterpolatedText } from './utils'

export interface ButtonProps extends WithAccessibility, WithTheme, WithStyle {
  /**
   * Actions to run when the button is pressed.
   */
  onPress?: Actions,
  /**
   * Whether the button should be enabled (true) or disabled (false).
   *
   * @defaultValue `true`
   */
  enabled?: Expression<boolean>,
  /**
   * The text that goes inside the button. This gets converted to the property "text" when serialized.
   */
  children: InterpolatedText,
}

/**
 * A native button of the platform.
 *
 * @example
 * ```tsx
 * <Button>Click me!</Button>
 * ```
 *
 * @category Component
 * @param props the properties for this component. See: {@link ButtonProps}.
 * @returns a JSX element, i.e an instance of Component.
 */
export const Button: FC<ButtonProps> = ({ id, style, children, ...props }) => {
  const text = childrenToInterpolatedText(children)
  return <StyledDefaultComponent name="button" id={id} style={style} properties={{ ...props, text }} />
}
