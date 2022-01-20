import { BeagleJSX, FC, Expression } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility } from '../types'

interface WebViewProps extends WithStyle, WithAccessibility {
  /**
   * The URL of the web page to load.
   */
  url: Expression<string>,
}

/**
 * Renders a Web View. In web platforms, renders an iframe.
 *
 * @param props {@link WebViewProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const Webview: FC<WebViewProps> = ({ id, style, ...props }) => (
  <StyledDefaultComponent name="webview" id={id} style={style} properties={props} />
)
