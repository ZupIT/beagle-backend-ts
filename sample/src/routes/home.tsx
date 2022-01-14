import { Container, Text, Button, Fragment } from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { Order } from './order'
import { UserInit } from '../fragments/user-init'
import { AppRequest } from './types'
import { globalContext } from '../global-context'

export const Home: Screen<AppRequest> = ({ request: { headers }, navigator }) => {
  const user = globalContext.get('user')
  const balance = globalContext.get('balance')

  return (
    <Container>
      <Fragment></Fragment>
      <Fragment>Arthur Bleil</Fragment>
    </Container>
    // <UserInit userId={headers['user-id']}>
    //   <Text text={`Hello ${user.get('name')}.`} />
    //   <Container style={{ marginTop: 10, backgroundColor: '#FF5555', paddingVertical: 5, paddingHorizontal: 10 }}>
    //     <Text text={`Seu saldo é de ${balance.get('currency')} ${balance.get('total')}`} textColor='#FFFFFF' />
    //   </Container>
    //   <Container style={{ flex: 1, alignItems: 'CENTER', justifyContent: 'CENTER' }}>
    //     <Button
    //       text="Check Order 001"
    //       onPress={navigator.pushView(Order, { navigationContext: { orderId: '001' }})}
    //     />
    //   </Container>
    //   <Fragment></Fragment>
    //   <Fragment>Arthur Bleil</Fragment>
    // </UserInit>
  )
}
