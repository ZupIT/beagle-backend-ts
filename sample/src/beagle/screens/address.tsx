import { Button, Container, ScreenComponent, Style, TextInput } from '@zup-it/beagle-backend-components'
import { Actions, BeagleJSX, createContext, Expression } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { capitalize } from 'lodash'
import { Address as AddressModel } from '../../models/order'
import { fetchCepAddress } from '../network/address'
import { Payment } from './payment'

export const Address: Screen = ({ navigator }) => {
  const address = createContext<AddressModel>('address')
  const fillByZip = (zip: Expression<string>) => fetchCepAddress({
    cep: zip,
    onSuccess: response => [
      address.get('city').set(response.get('data').get('localidade')),
      address.get('neighborhood').set(response.get('data').get('bairro')),
      address.get('state').set(response.get('data').get('uf')),
      address.get('street').set(response.get('data').get('logradouro')),
    ]
  })
  const formItemStyle: Style = { marginVertical: 10, marginHorizontal: 20 }

  const createInput = ({ name, flex, onBlur }: {
    name: keyof AddressModel,
    flex?: number,
    onBlur?: (value: Expression<string>) => Actions,
  }) => (
    <TextInput
      placeholder={capitalize(name)}
      style={{ flex, ...formItemStyle }}
      value={address.get(name)}
      onChange={value => address.get(name).set(value)}
      onBlur={onBlur}
    />
  )

  return (
    <ScreenComponent context={address} safeArea={true} navigationBar={{ title: 'Address' }}>
      <Container style={{ flex: 1 }}>
        {createInput({ name: 'zip', onBlur: fillByZip })}
        <Container style={{ flexDirection: 'ROW', justifyContent: 'SPACE_BETWEEN' }}>
          {createInput({ name: 'street', flex: 2 })}
          {createInput({ name: 'number', flex: 1 })}
        </Container>
        <Container style={{ flexDirection: 'ROW', justifyContent: 'SPACE_BETWEEN' }}>
          {createInput({ name: 'city', flex: 3 })}
          {createInput({ name: 'state', flex: 1 })}
        </Container>
      </Container>
      <Container style={{ flexDirection: 'ROW', justifyContent: 'SPACE_BETWEEN' }}>
        <Button onPress={navigator.popView()} style={formItemStyle}>Cancel</Button>
        <Button
          onPress={navigator.pushView(Payment, { navigationContext: { address }})}
          style={formItemStyle}
        >
          Next
        </Button>
      </Container>
    </ScreenComponent>
  )
}
