import { Container, Text, Button } from '@zup-it/beagle-backend-components'
import { React } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { navigator } from '.'
import { Order } from './order'
import { UserInit } from '../fragments/user-init'
import { AppRequest } from './types'

export const Home: Screen<AppRequest> = ({ request: { headers } }) => {
  const user = app.globalContext.get('user')
  const balance = app.globalContext.get('balance')

  return (
    <UserInit id={headers['user-id']}>
      <Text text={`Hello ${user.get('name')}.`} />
      <Container style={{ marginTop: 10, backgroundColor: '#FF5555', paddingVertical: 5, paddingHorizontal: 10 }}>
        <Text text={`Seu saldo é de ${balance.get('currency')} ${balance.get('total')}`} textColor='#FFFFFF' />
      </Container>
      <Container style={{ flex: 1, alignItems: 'CENTER', justifyContent: 'CENTER' }}>
        <Button
          text="Check Order 001"
          onPress={navigator.pushView(Order, { navigationContext: { orderId: '001' }})}
        />
      </Container>
    </UserInit>
  )
}
