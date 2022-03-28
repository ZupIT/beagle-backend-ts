import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { omit } from 'lodash'
import { Button } from '../../src/components/button'
import { Container, ContainerProps } from '../../src/components/container'
import { Text } from '../../src/components/text'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('Container', () => {
    const name = 'container'
    const id = 'test-container'
    const context = createContext('container-context-id')
    const props: ContainerProps = {
      onInit: alert('test value'),
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
      children: [
        <Text>This is the children test case.</Text>,
        <Button>Click me</Button>,
      ],
      context,
    }
    const options: ComponentTestOptions = {
      id,
      context,
      children: props.children,
      properties: omit(props, ['context', 'children']),
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <Container
          id={id}
          onInit={props.onInit}
          styleId={props.styleId}
          accessibility={props.accessibility}
          style={props.style}
          context={props.context}
        >
          {props.children}
        </Container>,
        name,
        options,
      )
    })
  })
})
