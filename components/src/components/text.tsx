import { BeagleJSX, FC, Expression } from '@zup-it/beagle-backend-core'
import { Color } from '../color'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'
import { validateColor } from '../validations'

interface TextProps extends WithAccessibility, WithTheme, WithStyle {
  textColor?: Color,
  alignment?: 'LEFT' | 'CENTER' | 'RIGHT',
  children: Expression<string>,
}

export const Text: FC<TextProps> = ({ id, style, children, ...props }) => {
  validateColor(props.textColor)
  return <StyledDefaultComponent name="text" id={id} style={style} properties={{ ...props, text: children }} />
}
