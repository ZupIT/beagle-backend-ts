import { BeagleJSX, Container, Text, Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { UserInit } from '../fragments/user-init'
import { Card } from '../fragments/card'
import { globalContext } from '../global-context'
import { AppRequest } from './types'

export const Profile: Screen<AppRequest> = ({ request: { headers }, navigator }) => {
  const user = globalContext.get('user')
  const itemStyle = { marginVertical: 3 }

  return (
    <UserInit userId={headers['user-id']}>
      <Card>
        <Text style={itemStyle}>{`User id: ${user.get('id')}`}</Text>
        <Text style={itemStyle}>{`Age: ${user.get('age')}`}</Text>
        <Text style={itemStyle}>{`Name: ${user.get('name')}`}</Text>
        <Text style={itemStyle}>{`Sex: \$${user.get('sex')}`}</Text>
      </Card>
      <Container style={{ flex: 1, alignContent: 'CENTER', justifyContent: 'CENTER' }}>
        <Button onPress={navigator.popView()}>Home</Button>
      </Container>
    </UserInit>
  )
}
