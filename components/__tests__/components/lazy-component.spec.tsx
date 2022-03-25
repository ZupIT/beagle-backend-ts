import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Text } from '../../src/components/text'
import { LazyComponent, LazyProps } from '../../src/components/lazy-component'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('LazyComponent', () => {
    const name = 'lazycomponent'
    const id = 'test-button'
    const properties: LazyProps = {
      children: undefined,
      path: '/lazy-screen',
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <LazyComponent id={id} path={properties.path}></LazyComponent>,
        name,
        { properties, id },
      )
    })

    describe('Children', () => {
      it('should create component with children as initialState property', () => {
        const children = <Text>This is the children test case.</Text>
        expectComponentToBeCorrect(
          <LazyComponent id={id} path={properties.path}>{children}</LazyComponent>,
          name,
          { id, properties: { ...properties, initialState: children } },
        )
      })
    })
  })
})
