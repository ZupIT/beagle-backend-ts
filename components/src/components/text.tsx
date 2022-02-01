import { BeagleJSX, FC } from '@zup-it/beagle-backend-core'
import { Color } from '../color'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'
import { validateColor } from '../validations'
import { InterpolatedText } from './types'
import { childrenToInterpolatedText } from './utils'

interface TextProps extends WithAccessibility, WithTheme, WithStyle {
  /**
   * The text color in the hex format: #RGB, #RGBA, #RRGGBB or #RRGGBBAA, where R is red, G is green, B is blue and
   * A is alpha (opacity).
   */
  textColor?: Color,
  /**
   * The text alignment. Default is 'LEFT'.
   */
  alignment?: 'LEFT' | 'CENTER' | 'RIGHT',
  /**
   * The text to print.
   */
  children: InterpolatedText,
}

/**
 * Renders a text. Each Text is a line.
 *
 * Example: `<Text>Hello World!</Text>`
 *
 * @param props {@link TextProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const Text: FC<TextProps> = ({ id, style, children, ...props }) => {
  validateColor(props.textColor)
  const text = childrenToInterpolatedText(children)
  return <StyledDefaultComponent name="text" id={id} style={style} properties={{ ...props, text }} />
}
