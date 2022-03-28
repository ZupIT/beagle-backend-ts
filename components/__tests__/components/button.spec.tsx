import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { omit } from 'lodash'
import { Button, ButtonProps } from '../../src/components/button'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('Button', () => {
    const name = 'button'
    const id = 'test-button'
    const props: ButtonProps = {
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
      children: ['Click', ' ', 'me!'],
    }
    const options: ComponentTestOptions = {
      id,
      properties: {
        ...omit(props, 'children'),
        text: 'Click me!',
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
          {props.children}
        </Button>,
        name,
        options,
      )
    })
  })
})
