import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { alert, sendRequest } from '@zup-it/beagle-backend-core/actions'
import { fromSimpleStyle } from '../../src/style/converter'
import { TextInput } from '../../src/components'
import { Button } from '../../src/components/button'
import { SimpleForm, SimpleFormProps } from '../../src/components/simple-form'
import { submitForm } from '../../src'
import { expectComponentToBeCorrect, mockStyledComponent } from './utils'

mockStyledComponent()

interface Address {
  zip: string,
  number: string,
  reference?: string,
}

const address = createContext<Address>('address')
const errors = createContext('errors', {
  showAll: false,
  show: {
    zip: false,
    reference: false,
  },
})

const postAddress = sendRequest({
  url: 'https://myapi.com/address',
  method: 'post',
  data: address,
  onSuccess: () => alert('Address registered!'),
  onError: () => alert('Unexpected error.'),
})

describe('Components', () => {
  describe('SimpleForm', () => {
    const name = 'simpleForm'
    const id = 'test-simple-form'
    const children = [
      <TextInput placeholder="Zip code (required)" value={address.get('zip')} />,
      <TextInput placeholder="Address reference" value={address.get('reference')} />,
      <Button onPress={submitForm({})}>Submit</Button>,
    ]
    const props: Partial<SimpleFormProps> = {
      onSubmit: postAddress,
      onValidationError: errors.get('showAll').set(true),
      styleId: 'test-simple-form-style-id',
      accessibility: {
        accessible: true,
        accessibilityLabel: 'SimpleForm Accessibility Label',
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
      children,
      properties: {
        ...props,
        style: fromSimpleStyle(props.style),
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <SimpleForm
          id={id}
          onSubmit={postAddress}
          onValidationError={props.onValidationError}
          styleId={props.styleId}
          accessibility={props.accessibility}
          style={props.style}
        >
          {children}
        </SimpleForm>,
        name,
        options,
      )
    })

    describe('Children', () => {
      it('should throw when no children is provided', () => {
        expect(() => <SimpleForm id={id} onSubmit={alert('Submitted')}>{ }</SimpleForm>).toThrowError()
        expect(() =>
          <SimpleForm id={id} onSubmit={alert('Submitted')}>
          </SimpleForm>
        ).toThrowError()
      })

      it('should throw when no children is bypassed trough linter', () => {
        expect(() => <SimpleForm id={id} onSubmit={alert('Submitted')}>{[]}</SimpleForm>).toThrowError()
      })
    })
  })
})
