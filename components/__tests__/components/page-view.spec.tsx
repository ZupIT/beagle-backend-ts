import { Actions, BeagleJSX, Context, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { omit } from 'lodash'
import { Button } from '../../src/components/button'
import { PageView, PageViewProps } from '../../src/components/page-view'
import { Text } from '../../src/components/text'
import { ComponentTestOptions, expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('PageView', () => {
    const name = 'pageView'
    const id = 'test-page-view'
    const context = createContext('page-view-context-id')
    const currentPage = createContext('currentPage', 0)
    const onPageChange: (newCurrentPage: Context<number>) => Actions = (page) => currentPage.set(page)
    const props: PageViewProps = {
      onPageChange,
      currentPage: 2,
      showArrow: true,
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
      properties: {
        ...omit(props, ['context', 'children']),
        onPageChange: onPageChange(createContextNode('onPageChange')),
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <PageView
          id={id}
          currentPage={props.currentPage}
          showArrow={props.showArrow}
          context={context}
          onPageChange={props.onPageChange}
        >
          {props.children}
        </PageView>,
        name,
        options,
      )
    })
  })
})
