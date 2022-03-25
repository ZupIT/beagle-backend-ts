import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { colors } from '../../src/color'
import { fromSimpleStyle } from '../../src/style/converter'
import { PullToRefresh, PullToRefreshProps } from '../../src/components/pull-to-refresh'
import { Text } from '../../src/components/text'
import { Button } from '../../src/components/button'
import { Container } from '../../src/components/container'
import { expectComponentToBeCorrect, mockStyledComponent } from './utils'

mockStyledComponent()

describe('Components', () => {
  describe('PullToRefresh', () => {
    const name = 'pullToRefresh'
    const id = 'test-pull-to-refresh'
    const children = [<Text>This is the children test case.</Text>, <Button>Click me</Button>]
    const onPull = alert('Refreshing...')
    const context = createContext('pull-to-refresh-context-id')
    const props: Partial<PullToRefreshProps> = {
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
      onPull,
    }
    const options = {
      id,
      context,
      properties: {
        ...props,
        child: <Container>{children}</Container>,
        style: fromSimpleStyle(props.style),
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
          context={context}
          onPull={onPull}
        >
          {children}
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
              onPull={onPull}
            >
                {children}
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
              onPull={onPull}
            >
              {children}
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
              onPull={onPull}
            >
              {overwrittenChildren}
            </PullToRefresh>,
            name,
            overwrittenOptions,
          )
        })

        it('should throw when no children is provided', () => {
          expect(() => <PullToRefresh isRefreshing={false}>{}</PullToRefresh>).toThrowError()
          expect(() =>
            <PullToRefresh id={id} isRefreshing={false}>
            </PullToRefresh>
          ).toThrowError()
        })

        it('should throw when no children is bypassed trough linter', () => {
          expect(() => <PullToRefresh id={id} isRefreshing={false}>{[]}</PullToRefresh>).toThrowError()
        })
      })
    })
  })
})
