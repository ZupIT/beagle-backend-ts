import { Container, Text, Button } from '@zup-it/beagle-backend-components'
import { React, FC } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { app } from '../app'
import { Card } from '../fragments/card'

interface NavigationContextType {
  orderId: string,
}

export const Profile: FC<Screen<any, any, any, any, NavigationContextType>> = ({ navigationContext }) => {
  const user = app.globalContext.get('user')

  const itemStyle = { marginVertical: 3 }

  return (
    <Container>
      <Card>
        <Text style={itemStyle} text={`User id: ${user.get('id')}`} />
        <Text style={itemStyle} text={`Age: ${user.get('age')}`} />
        <Text style={itemStyle} text={`Name: ${user.get('name')}`} />
        <Text style={itemStyle} text={`Sex: \$${user.get('sex')}`} />
      </Card>
      <Container style={{ flex: 1, alignContent: 'CENTER', justifyContent: 'CENTER' }}>
        <Button text='Home' onPress={app.navigator.remote.popView()}  />
      </Container>
    </Container>
  )
}

app.addScreen({ path: '/order', screen: Profile })
