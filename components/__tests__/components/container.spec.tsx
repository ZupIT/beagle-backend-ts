import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { setContext } from '@zup-it/beagle-backend-core/actions/set-context'
import { fromSimpleStyle } from '../../src/style/converter'
import { Button } from '../../src/components/button'
import { Container, ContainerProps } from '../../src/components/container'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect, mockStyledComponent } from './utils'

mockStyledComponent()

describe('Components', () => {
  describe('Container', () => {
    const name = 'container'
    const id = 'test-container'
    const context = createContext('container-context-id')
    const props: Partial<ContainerProps> = {
      onInit: setContext({ contextId: 'test-context', value: 'test value' }),
      styleId: 'test-container-style-id',
      accessibility: {
        accessible: true,
        accessibilityLabel: 'Container Accessibility Label',
        isHeader: false,
      },
      style: {
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
      },
    }
    const options = {
      id,
      context,
      properties: {
        ...props,
        style: fromSimpleStyle(props.style),
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <Container
          id={id}
          onInit={props.onInit}
          styleId={props.styleId}
          accessibility={props.accessibility}
          style={props.style}
          context={context}
        >
        </Container>,
        name,
        options,
      )
    })

    describe('Children', () => {
      it('should create component', () => {
        const children = [<Text>This is the children test case.</Text>, <Button>Click me</Button>]
        expectComponentToBeCorrect(
          <Container
            id={id}
            onInit={props.onInit}
            styleId={props.styleId}
            accessibility={props.accessibility}
            style={props.style}
            context={context}
          >
            {children}
          </Container>,
          name,
          { ...options, children }
        )
      })
    })
  })
})
