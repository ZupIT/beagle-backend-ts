import { BeagleJSX, Actions, FC, Expression } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface ButtonProps extends WithAccessibility, WithTheme, WithStyle {
  /**
   * Actions to run when the button is pressed.
   */
  onPress?: Actions,
  /**
   * Whether the button should be enabled (true) or disabled (false). Default is enabled.
   */
  enabled?: boolean,
  /**
   * The text that goes inside the button. This gets converted to the property "text" when serialized.
   */
  children: Expression<string>,
}

/**
 * A native button of the platform.
 *
 * Example: `<Button>Click me!</Button>`
 *
 * @param props {@link ButtonProps}.
 * @returns a JSX element, i.e an instance of Component.
 */
export const Button: FC<ButtonProps> = ({ id, style, children, ...props }) => (
  <StyledDefaultComponent name="button" id={id} style={style} properties={{ ...props, text: children }} />
)
