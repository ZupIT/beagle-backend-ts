import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { PullToRefresh, PullToRefreshProps } from '../../src/components/pull-to-refresh'
import { Text } from '../../src/components/text'
import { Button } from '../../src/components/button'
import { Container } from '../../src/components/container'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('PullToRefresh', () => {
    const name = 'pullToRefresh'
    const id = 'test-pull-to-refresh'
    const children = [<Text>This is the children test case.</Text>, <Button>Click me</Button>]
    const onPull = alert('Refreshing...')
    const properties: Partial<PullToRefreshProps> = { isRefreshing: false, color: '#df7008' }
    const options = { id, properties: { ...properties, child: <Container>{children}</Container> } }

    it ('should create component with its children under the "child" property', () => {
      expectComponentToBeCorrect(
        <PullToRefresh id={id} isRefreshing={properties.isRefreshing} color={properties.color}>
          {children}
        </PullToRefresh>,
        name,
        options,
      )
    })

    it('should create component', () => {
      expectComponentToBeCorrect(
        <PullToRefresh
          id={id}
          onPull={onPull}
          isRefreshing={properties.isRefreshing}
          color={properties.color}
        >
          {children}
        </PullToRefresh>,
        name,
        { ...options, properties: { ...options.properties, onPull } },
      )
    })

    describe('Validations', () => {
      describe('Colors', () => {
        it('should create with valid color', () => {
          expectComponentToBeCorrect(
            <PullToRefresh id={id} isRefreshing={false} color={properties.color}>{children}</PullToRefresh>,
            name,
            options,
          )
        })

        it('should throw with valid color', () => {
          expect(() =>
            <PullToRefresh id={id} isRefreshing={false} color="#test123">{children}</PullToRefresh>
          ).toThrowError()
        })
      })

      describe('Children', () => {
        it ('should set the child as the Component passed, when children is a single child', () => {
          const overwrittenChildren = <Text>This is the children test case.</Text>
          const overwrittenOptions = { id, properties: { ...properties, child: overwrittenChildren } }
          delete overwrittenOptions.properties.color
          expectComponentToBeCorrect(
            <PullToRefresh id={id} isRefreshing={false}>{overwrittenChildren}</PullToRefresh>,
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
