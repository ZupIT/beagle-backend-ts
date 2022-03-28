import { BeagleJSX, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { TextInput, TextInputProps } from '../../src/components/text-input'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('TextInput', () => {
    const name = 'textInput'
    const id = 'test-text-input'
    const testField = createContext('testField', '')
    const props: TextInputProps = {
      value: testField,
      placeholder: 'Test Text Input',
      enabled: true,
      readOnly: false,
      type: 'TEXT',
      error: 'My error',
      showError: true,
      onFocus: (value) => testField.set(value),
      onChange: (value) => testField.set(value),
      onBlur: (value) => testField.set(value),
      styleId: 'test-text-input-style-id',
      accessibility: {
        accessible: true,
        accessibilityLabel: 'TextInput Accessibility Label',
        isHeader: false,
      },
      style: {
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
      },
    }
    const options = {
      id,
      properties: {
        ...props,
        onFocus: props.onFocus!(createContextNode<{ value: string }>('onFocus').get('value')),
        onChange: props.onChange!(createContextNode<{ value: string }>('onChange').get('value')),
        onBlur: props.onBlur!(createContextNode<{ value: string }>('onBlur').get('value')),
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <TextInput
          id={id}
          value={props.value}
          placeholder={props.placeholder}
          enabled={props.enabled}
          readOnly={props.readOnly}
          type={props.type}
          error={props.error}
          showError={props.showError}
          onFocus={props.onFocus}
          onChange={props.onChange}
          onBlur={props.onBlur}
          styleId={props.styleId}
          accessibility={props.accessibility}
          style={props.style}
        />,
        name,
        options
      )
    })
  })
})
