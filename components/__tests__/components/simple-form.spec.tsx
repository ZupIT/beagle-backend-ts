import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { alert, sendRequest } from '@zup-it/beagle-backend-core/actions'
import { TextInput } from 'src/components'
import { Button } from '../../src/components/button'
import { SimpleForm, SimpleFormProps } from '../../src/components/simple-form'
import { submitForm } from '../../src'
import { expectComponentToBeCorrect } from './utils'

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
    const properties: Partial<SimpleFormProps> = {
      onSubmit: postAddress,
      onValidationError: errors.get('showAll').set(true),
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <SimpleForm id={id} onSubmit={postAddress} onValidationError={errors.get('showAll').set(true)}>
          {children}
        </SimpleForm>,
        name,
        { id, properties, children }
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
