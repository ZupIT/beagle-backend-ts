import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { omit } from 'lodash'
import { Text } from '../../src/components/text'
import { LazyComponent, LazyProps } from '../../src/components/lazy-component'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('LazyComponent', () => {
    const name = 'lazycomponent'
    const id = 'test-button'
    const props: LazyProps = {
      path: '/lazy-screen',
      children: <Text>This is the children test case.</Text>,
    }

    it('should create component with children as initialState property', () => {
      expectComponentToBeCorrect(
        <LazyComponent id={id} path={props.path!}>{ props.children }</LazyComponent>,
        name,
        { id, properties: { ...omit(props, 'children'), initialState: props.children } },
      )
    })
  })
})
