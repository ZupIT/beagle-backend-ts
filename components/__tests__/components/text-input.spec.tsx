import { BeagleJSX, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { TextInput, TextInputProps } from '../../src/components/text-input'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('TextInput', () => {
    const name = 'textInput'
    const id = 'test-text-input'
    const testField = createContext('testField', '')
    const properties: TextInputProps = {
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
    }
    const options = {
      id,
      properties: {
        ...properties,
        onFocus: properties.onFocus!(createContextNode<{ value: string }>('onFocus').get('value')),
        onChange: properties.onChange!(createContextNode<{ value: string }>('onChange').get('value')),
        onBlur: properties.onBlur!(createContextNode<{ value: string }>('onBlur').get('value')),
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <TextInput
          id={id}
          value={properties.value}
          placeholder={properties.placeholder}
          enabled={properties.enabled}
          readOnly={properties.readOnly}
          type={properties.type}
          error={properties.error}
          showError={properties.showError}
          onFocus={properties.onFocus}
          onChange={properties.onChange}
          onBlur={properties.onBlur}
        />,
        name,
        options
      )
    })
  })
})
