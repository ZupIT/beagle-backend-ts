import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Container, Text, Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { Order } from './order'
import { UserInit } from '../fragments/user-init'
import { AppRequest } from './types'
import { globalContext } from '../global-context'

export const Home: Screen<AppRequest> = ({ request: { headers }, navigator }) => {
  const user = globalContext.get('user')
  const balance = globalContext.get('balance')

  return (
    <UserInit userId={headers['user-id']}>
      <Text>{`Hello ${user.get('name')}.`}</Text>
      <Container style={{ marginTop: 10, backgroundColor: '#FF5555', paddingVertical: 5, paddingHorizontal: 10 }}>
        <Text textColor='#FFFFFF'>{`Seu saldo é de ${balance.get('currency')} ${balance.get('total')}`}</Text>
      </Container>
      <Container style={{ flex: 1, alignItems: 'CENTER', justifyContent: 'CENTER' }}>
        <Button onPress={navigator.pushView(Order, { navigationContext: { orderId: '001' }})}>Check Order 001</Button>
      </Container>
    </UserInit>
  )
}
