import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { fromSimpleStyle } from '../../src/style/converter'
import { Button, ButtonProps } from '../../src/components/button'
import { expectComponentToBeCorrect, mockStyledComponent } from './utils'

mockStyledComponent()

describe('Components', () => {
  describe('Button', () => {
    const name = 'button'
    const id = 'test-button'
    const props: Partial<ButtonProps> = {
      style: {
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
      },
      enabled: true,
      onPress: alert('Test Button!'),
      styleId: 'test-button-style-id',
      accessibility: {
        accessible: true,
        accessibilityLabel: 'Button Accessibility Label',
        isHeader: false,
      },
    }

    it('should create component with text as a property', () => {
      expectComponentToBeCorrect(
        <Button
          id={id}
          style={props.style}
          enabled={props.enabled}
          onPress={props.onPress}
          styleId={props.styleId}
          accessibility={props.accessibility}
        >
          Click me!
        </Button>,
        name,
        { properties: { ...props, text: 'Click me!', style: fromSimpleStyle(props.style) }, id }
      )
    })
  })
})
