import { BeagleJSX, FC, Expression } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SpecificWebviewProps {
  url: string | Expression<string>,
}

type WebviewProps = SpecificWebviewProps & Accessibility & Theme & Style

export const Webview: FC<WebviewProps> = ({ id, style, ...props }) => (
  <StyledDefaultComponent name="webview" id={id} style={style} properties={props} />
)
