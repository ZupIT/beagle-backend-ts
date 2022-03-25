import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Button } from '../../src/components/button'
import { ScrollView, ScrollViewProps } from '../../src/components/scroll-view'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('ScrollView', () => {
    const name = 'scrollView'
    const id = 'test-scroll-view'
    const children = [<Text>This is the child test case.</Text>, <Button>Click me</Button>]
    const properties: Partial<ScrollViewProps> = {
      scrollDirection: 'HORIZONTAL',
      scrollBarEnabled: true,
      context: undefined,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <ScrollView
          id={id}
          scrollDirection={properties.scrollDirection}
          scrollBarEnabled={properties.scrollBarEnabled}
        >
          {children}
        </ScrollView>,
        name,
        { id, properties, children },
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
