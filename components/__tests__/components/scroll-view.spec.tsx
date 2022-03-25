import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { Button } from '../../src/components/button'
import { ScrollView, ScrollViewProps } from '../../src/components/scroll-view'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('ScrollView', () => {
    const name = 'scrollView'
    const id = 'test-scroll-view'
    const context = createContext('scroll-view-context-id')
    const children = [<Text>This is the child test case.</Text>, <Button>Click me</Button>]
    const props: Partial<ScrollViewProps> = {
      scrollDirection: 'HORIZONTAL',
      scrollBarEnabled: true,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <ScrollView
          id={id}
          scrollDirection={props.scrollDirection}
          scrollBarEnabled={props.scrollBarEnabled}
          context={context}
        >
          {children}
        </ScrollView>,
        name,
        { id, context, properties: props, children },
      )
    })

    describe('Children', () => {
      it('should throw when no children is provided', () => {
        expect(() => <ScrollView id={id}>{ }</ScrollView>).toThrowError()
        expect(() =>
          <ScrollView id={id}>
          </ScrollView>
        ).toThrowError()
      })

      it('should throw when no children is bypassed trough linter', () => {
        expect(() => <ScrollView id={id}>{[]}</ScrollView>).toThrowError()
      })
    })
  })
})
