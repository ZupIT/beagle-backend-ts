import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { omit } from 'lodash'
import { Button } from '../../src/components/button'
import { ScrollView, ScrollViewProps } from '../../src/components/scroll-view'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('ScrollView', () => {
    const name = 'scrollView'
    const id = 'test-scroll-view'
    const context = createContext('scroll-view-context-id')
    const props: ScrollViewProps = {
      scrollDirection: 'HORIZONTAL',
      scrollBarEnabled: true,
      children: [
        <Text>This is the child test case.</Text>,
        <Button>Click me</Button>,
      ],
      context,
    }
    const options = {
      id,
      context,
      children: props.children,
      properties: {
        ...omit(props, ['context', 'children']),
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <ScrollView
          id={id}
          scrollDirection={props.scrollDirection}
          scrollBarEnabled={props.scrollBarEnabled}
          context={context}
        >
          {props.children}
        </ScrollView>,
        name,
        options,
      )
    })
  })
})
