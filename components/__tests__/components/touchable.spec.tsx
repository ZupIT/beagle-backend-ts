import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { omit } from 'lodash'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { Touchable, TouchableProps } from '../../src/components/touchable'
import { Container } from '../../src/components/container'
import { Image } from '../../src/components'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Touchable', () => {
    const name = 'touchable'
    const id = 'test-touchable'
    const props: TouchableProps = {
      onPress: alert('Touchable Alert'),
      children: [
        <Image type="remote" url="https://my-backend/my-image.png" />,
        <Text>This is the children test case.</Text>,
      ],
    }
    const options = {
      id,
      children: undefined,
      properties: {
        ...omit(props, 'children'),
        child: <Container>{props.children}</Container>,
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <Touchable id={id} onPress={props.onPress!}>{props.children}</Touchable>,
        name,
        options,
      )
    })

    describe('Children', () => {
      it ('should set the child as the Component passed, when children is a single child', () => {
        const overwrittenChildren = <Text>This is the children test case.</Text>
        const overwrittenOptions = { id, properties: { ...props, children: undefined, child: overwrittenChildren } }
        expectComponentToBeCorrect(
          <Touchable id={id} onPress={props.onPress!}>{overwrittenChildren}</Touchable>,
          name,
          overwrittenOptions,
        )
      })
    })
  })
})
