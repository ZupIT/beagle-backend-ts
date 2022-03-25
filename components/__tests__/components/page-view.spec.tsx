import { Actions, BeagleJSX, Context, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { Button } from '../../src/components/button'
import { PageView, PageViewProps } from '../../src/components/page-view'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('PageView', () => {
    const name = 'pageView'
    const id = 'test-page-view'
    const context = createContext('page-view-context-id')
    const currentPage = createContext('currentPage', 0)
    const onPageChange: (newCurrentPage: Context<number>) => Actions = (page) => currentPage.set(page)
    const props: PageViewProps = {
      onPageChange: undefined,
      currentPage: 2,
      showArrow: true,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <PageView
          id={id}
          currentPage={props.currentPage}
          showArrow={props.showArrow}
          context={context}
        >
        </PageView>,
        name,
        { id, properties: props, context },
      )
    })

    describe('Events', () => {
      describe('onPageChangeActions', () => {
        it('should create component with onPageChange creating a ContextNode', () => {
          expectComponentToBeCorrect(
            <PageView
              id={id}
              currentPage={props.currentPage}
              showArrow={props.showArrow}
              onPageChange={onPageChange}
              context={context}
            >
            </PageView>,
            name,
            {
              id,
              context,
              properties: {
                ...props,
                onPageChange: onPageChange(createContextNode('onPageChange')),
              },
            },
          )
        })
      })
    })


    describe('Children', () => {
      const children = [<Text>This is the children test case.</Text>, <Button>Click me</Button>]

      it('should create component', () => {
        expectComponentToBeCorrect(
          <PageView
            id={id}
            currentPage={props.currentPage}
            showArrow={props.showArrow}
            context={context}
          >
            {children}
          </PageView>,
          name,
          { id, properties: props, children, context },
        )
      })

      describe('Events', () => {
        describe('onPageChangeActions', () => {
          it('should create component with onPageChange creating a ContextNode', () => {
            expectComponentToBeCorrect(
              <PageView
                id={id}
                currentPage={props.currentPage}
                showArrow={props.showArrow}
                onPageChange={onPageChange}
                context={context}
              >
                {children}
              </PageView>,
              name,
              {
                id,
                children,
                properties: { ...props, onPageChange: onPageChange(createContextNode('onPageChange')) },
                context,
              },
            )
          })
        })
      })
    })
  })
})
