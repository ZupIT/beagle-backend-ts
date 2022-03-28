import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { omit } from 'lodash'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { colors } from '../../src/color'
import { PullToRefresh, PullToRefreshProps } from '../../src/components/pull-to-refresh'
import { Text } from '../../src/components/text'
import { Button } from '../../src/components/button'
import { Container } from '../../src/components/container'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('PullToRefresh', () => {
    const name = 'pullToRefresh'
    const id = 'test-pull-to-refresh'
    const context = createContext('pull-to-refresh-context-id')
    const props: PullToRefreshProps = {
      isRefreshing: false,
      color: colors.aqua,
      accessibility: {
        accessible: true,
        accessibilityLabel: 'Container Accessibility Label',
        isHeader: false,
      },
      style: {
        borderColor: '#000',
        backgroundColor: '#FFF',
        padding: 10,
      },
      onPull: alert('Refreshing...'),
      children: [
        <Text>This is the children test case.</Text>,
        <Button>Click me</Button>,
      ],
      context,
    }
    const options = {
      id,
      context,
      properties: {
        ...omit(props, ['context', 'children']),
        child: <Container>{props.children}</Container>,
        style: props.style,
      },
    }

    it ('should create component with its children under the "child" property', () => {
      expectComponentToBeCorrect(
        <PullToRefresh
          id={id}
          isRefreshing={props.isRefreshing}
          color={props.color}
          accessibility={props.accessibility}
          style={props.style}
          context={props.context}
          onPull={props.onPull}
        >
          {props.children}
        </PullToRefresh>,
        name,
        options,
      )
    })

    describe('Validations', () => {
      describe('Colors', () => {
        it('should create with valid color', () => {
          expectComponentToBeCorrect(
            <PullToRefresh
              id={id}
              isRefreshing={props.isRefreshing}
              color={props.color}
              accessibility={props.accessibility}
              style={props.style}
              context={context}
              onPull={props.onPull}
            >
              {props.children}
            </PullToRefresh>,
            name,
            options,
          )
        })

        it('should throw with valid color', () => {
          expect(() =>
            <PullToRefresh
              id={id}
              isRefreshing={props.isRefreshing}
              color="#test123"
              accessibility={props.accessibility}
              style={props.style}
              context={context}
              onPull={props.onPull}
            >
              {props.children}
            </PullToRefresh>
          ).toThrowError()
        })
      })

      describe('Children', () => {
        it ('should set the child as the Component passed, when children is a single child', () => {
          const overwrittenChildren = <Text>This is the children test case.</Text>
          const overwrittenOptions = { id, context, properties: { ...options.properties, child: overwrittenChildren } }
          expectComponentToBeCorrect(
            <PullToRefresh
              id={id}
              isRefreshing={props.isRefreshing}
              color={props.color}
              accessibility={props.accessibility}
              style={props.style}
              context={context}
              onPull={props.onPull}
            >
              {overwrittenChildren}
            </PullToRefresh>,
            name,
            overwrittenOptions,
          )
        })
      })
    })
  })
})
