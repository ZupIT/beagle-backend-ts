import { React, FC, Expression } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility } from '../types'

interface WebViewProps extends WithStyle, WithAccessibility {
  url: Expression<string>,
}

export const Webview: FC<WebViewProps> = ({ id, style, ...props }) => (
  <StyledDefaultComponent name="webview" id={id} style={style} properties={props} />
)
