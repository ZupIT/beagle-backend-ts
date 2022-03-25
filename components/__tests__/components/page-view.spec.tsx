import { Actions, BeagleJSX, Context, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { Button } from '../../src/components/button'
import { PageView, PageViewProps } from '../../src/components/page-view'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('PageView', () => {
    const name = 'pageView'
    const id = 'test-page-view'
    const currentPage = createContext('currentPage', 0)
    const onPageChange: (newCurrentPage: Context<number>) => Actions = (page) => currentPage.set(page)
    const properties: PageViewProps = {
      onPageChange: undefined,
      currentPage: 2,
      showArrow: true,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <PageView
          id={id}
          currentPage={properties.currentPage}
          showArrow={properties.showArrow}
        >
        </PageView>,
        name,
        { id, properties },
      )
    })

    describe('Events', () => {
      describe('onPageChangeActions', () => {
        it('should create component with onPageChange creating a ContextNode', () => {
          expectComponentToBeCorrect(
            <PageView
              id={id}
              currentPage={properties.currentPage}
              showArrow={properties.showArrow}
              onPageChange={onPageChange}
            >
            </PageView>,
            name,
            { id, properties: { ...properties, onPageChange: onPageChange(createContextNode('onPageChange')) } },
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
            currentPage={properties.currentPage}
            showArrow={properties.showArrow}
          >
            {children}
          </PageView>,
          name,
          { id, properties, children },
        )
      })

      describe('Events', () => {
        describe('onPageChangeActions', () => {
          it('should create component with onPageChange creating a ContextNode', () => {
            expectComponentToBeCorrect(
              <PageView
                id={id}
                currentPage={properties.currentPage}
                showArrow={properties.showArrow}
                onPageChange={onPageChange}
              >
                {children}
              </PageView>,
              name,
              {
                id,
                children,
                properties: { ...properties, onPageChange: onPageChange(createContextNode('onPageChange')) },
              },
            )
          })
        })
      })
    })
  })
})
