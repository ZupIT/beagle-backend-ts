import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { WebView, WebViewProps } from '../../src/components/webview'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('Webview', () => {
    const name = 'webview'
    const id = 'test-webview'
    const props: WebViewProps = {
      url: 'https://usebeagle.io',
      accessibility: {
        accessible: true,
        accessibilityLabel: 'Container Accessibility Label',
        isHeader: false,
      },
      style: {
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <WebView
          id={id}
          url={props.url}
          accessibility={props.accessibility}
          style={props.style}
        />,
        name,
        {
          id,
          properties: props,
        },
      )
    })
  })
})
