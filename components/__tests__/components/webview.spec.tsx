import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { WebView, WebViewProps } from '../../src/components/webview'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Webview', () => {
    const name = 'webview'
    const id = 'test-webview'
    const properties: WebViewProps = {
      url: 'https://usebeagle.io',
    }

    it('should create component', () => {
      expectComponentToBeCorrect(<WebView id={id} url={properties.url} />, name, { id, properties })
    })
  })
})
