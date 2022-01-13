import { Container, Text, Button } from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { UserInit } from '../fragments/user-init'
import { Card } from '../fragments/card'
import { globalContext } from '../global-context'
import { AppRequest } from './types'

export const Profile: Screen<AppRequest> = ({ request: { headers }, navigator }) => {
  const user = globalContext.get('user')
  const itemStyle = { marginVertical: 3 }

  return (
    <UserInit id={headers['user-id']}>
      <Card>
        <Text style={itemStyle} text={`User id: ${user.get('id')}`} />
        <Text style={itemStyle} text={`Age: ${user.get('age')}`} />
        <Text style={itemStyle} text={`Name: ${user.get('name')}`} />
        <Text style={itemStyle} text={`Sex: \$${user.get('sex')}`} />
      </Card>
      <Container style={{ flex: 1, alignContent: 'CENTER', justifyContent: 'CENTER' }}>
        <Button text='Home' onPress={navigator.popView()}  />
      </Container>
    </UserInit>
  )
}
