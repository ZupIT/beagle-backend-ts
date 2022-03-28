import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { alert, sendRequest } from '@zup-it/beagle-backend-core/actions'
import { omit } from 'lodash'
import { TextInput } from '../../src/components'
import { Button } from '../../src/components/button'
import { SimpleForm, SimpleFormProps } from '../../src/components/simple-form'
import { submitForm } from '../../src'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

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
    const props: SimpleFormProps = {
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
      children: [
        <TextInput placeholder="Zip code (required)" value={address.get('zip')} />,
        <TextInput placeholder="Address reference" value={address.get('reference')} />,
        <Button onPress={submitForm({})}>Submit</Button>,
      ],
      context: errors,
    }
    const options = {
      id,
      context: errors,
      children: props.children,
      properties: omit(props, ['context', 'children']),
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
          context={props.context}
        >
          {props.children}
        </SimpleForm>,
        name,
        options,
      )
    })
  })
})
