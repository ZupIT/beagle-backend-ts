import { BeagleJSX, Actions, FC, Expression } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface ButtonProps extends WithAccessibility, WithTheme, WithStyle {
  onPress?: Actions,
  enabled?: boolean,
  children: Expression<string>,
}

export const Button: FC<ButtonProps> = ({ id, style, children, ...props }) => (
  <StyledDefaultComponent name="button" id={id} style={style} properties={{ ...props, text: children }} />
)
