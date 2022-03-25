import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { Button, ButtonProps } from '../../src/components/button'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Button', () => {
    const name = 'button'
    const id = 'test-button'
    const props: Partial<ButtonProps> = {
      style: undefined,
      children: undefined,
      enabled: true,
      onPress: alert('Test Button!'),
      styleId: undefined,
    }

    it('should create component with text as a property', () => {
      expectComponentToBeCorrect(
        <Button id={id} enabled={props.enabled} onPress={props.onPress} styleId={props.styleId}>Click me!</Button>,
        name,
        { properties: { ...props, text: 'Click me!' }, id }
      )
    })
  })
})
