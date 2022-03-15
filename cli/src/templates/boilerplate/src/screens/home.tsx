import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Button, If, Text, Then } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { gte, length } from '@zup-it/beagle-backend-core/operations'
import { globalContext } from '../global-context'

export const Home: Screen = ({ navigator }) => (
  <>
    <Text>Hello!</Text>
    <Text style={{ marginTop: 40 }}>This is the Home Page!</Text>
    <If condition={gte(length(globalContext.get('message') ?? ''), 0)}>
      <Then>
        <Text style={{ marginTop: 40 }}>Global context: {globalContext.get('message')}</Text>
      </Then>
    </If>
    <Button style={{ marginTop: 40 }} onPress={navigator.popView()}>Go back</Button>
  </>
)
