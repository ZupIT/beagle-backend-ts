import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { setContext } from '@zup-it/beagle-backend-core/actions/set-context'
import { Touchable, TouchableProps } from '../../src/components/touchable'
import { Container } from '../../src/components/container'
import { Image } from '../../src/components'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Touchable', () => {
    const name = 'touchable'
    const id = 'test-touchable'
    const children = [
      <Image type="remote" url="https://my-backend/my-image.png" />,
      <Text>This is the children test case.</Text>,
    ]
    const props: Partial<TouchableProps> = {
      onPress: setContext({ contextId: 'test-context', value: 'test value' }),
    }
    const options = { id, properties: { ...props, child: <Container>{children}</Container> } }

    it('should create component', () => {
      expectComponentToBeCorrect(<Touchable id={id} onPress={props.onPress!}>{children}</Touchable>, name, options)
    })

    describe('Children', () => {
      it ('should set the child as the Component passed, when children is a single child', () => {
        const overwrittenChildren = <Text>This is the children test case.</Text>
        const overwrittenOptions = { id, properties: { ...props, child: overwrittenChildren } }
        expectComponentToBeCorrect(
          <Touchable id={id} onPress={props.onPress!}>{overwrittenChildren}</Touchable>,
          name,
          overwrittenOptions,
        )
      })

      it('should throw when no children is provided', () => {
        expect(() => <Touchable id={id} onPress={props.onPress!}>{}</Touchable>).toThrowError()
        expect(() =>
          <Touchable id={id} onPress={props.onPress!}>
          </Touchable>
        ).toThrowError()
      })

      it('should throw when no children is bypassed trough linter', () => {
        expect(() => <Touchable id={id} onPress={props.onPress!}>{[]}</Touchable>).toThrowError()
      })
    })
  })
})
