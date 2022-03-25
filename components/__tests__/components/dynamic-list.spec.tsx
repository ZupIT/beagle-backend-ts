import { BeagleJSX, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { setContext } from '@zup-it/beagle-backend-core/actions/set-context'
import { isNull, not } from '@zup-it/beagle-backend-core/operations'
import { MapContextNode } from '@zup-it/beagle-backend-core/model/context/types'
import { fromSimpleStyle } from '../../src/style/converter'
import { Template, TemplateProps, Text, Container, ListViewProps, ListView, GridViewProps, GridView } from '../../src/components'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('DynamicList', () => {
    describe('Template', () => {
      const name = 'template'
      const itemContext = createContext('itemContext', { title: 'Test Book Title' })
      const children = [
        <Text>Audio book</Text>,
        <Text>{itemContext.get('title')}</Text>,
      ]
      const props: Partial<TemplateProps> = {
        case: not(isNull(itemContext.get('title'))),
      }
      const options = {
        properties: {
          ...props,
          view: <Container>{children}</Container>,
        },
        namespace: 'pseudo',
      }

      it('should create component', () => {
        expectComponentToBeCorrect(<Template case={props.case}>{children}</Template>, name, options)
      })

      it('should create component without wrapper when single child', () => {
        const overwrittenChildren = <Text>Audio book</Text>
        const overwrittenOptions = {
          ...options,
          properties: {
            ...props,
            view: overwrittenChildren,
          },
        }
        expectComponentToBeCorrect(
          <Template case={props.case}>{overwrittenChildren}</Template>,
          name,
          overwrittenOptions,
        )
      })
    })

    describe('ListView', () => {
      type Book = { id: string, title: string, length: number, author: string, narrator?: string }
      const id = 'test-list-view'
      const name = 'listView'
      const context = createContext('list-view-context')
      const books: Array<Book> = [
        {
          id: 'rhythm_of_war_#57',
          title: 'Rhythm of war',
          length: 57.5,
          author: 'Brandon Sanderson',
          narrator: 'Michael Kramer and Kate Reading',
        },
        {
          id: 'a_game_of_thrones_#819',
          title: 'A Game of Thrones',
          length: 819,
          author: 'George R.R. Martin',
        },
      ]
      const props: Partial<ListViewProps<Book>> = {
        accessibility: {
          accessible: true,
          accessibilityLabel: 'listView Accessibility Label',
          isHeader: false,
        },
        direction: 'HORIZONTAL',
        isScrollIndicatorVisible: true,
        dataSource: books,
        iteratorName: 'book',
        key: 'id',
        onInit: setContext({ contextId: 'list-view-context', value: [] }),
        onScrollEnd: alert('Scroll ended'),
        scrollEndThreshold: 98,
        style: {
          borderColor: '#000',
          backgroundColor: '#fff',
          padding: 10,
        },
      }
      const listViewChildren = (item: MapContextNode<Book>) => [
        <Template>
          <Text>Audio book</Text>
          <Text>
            {`${item.get('title')} was written by ${item.get('author')} `}
          </Text>
        </Template>,
        <Template case={isNull(item.get('narrator'))}>
          <Text>Physical book</Text>
          <Text>
            {`${item.get('title')} was written by ${item.get('author')}. It has ${item.get('length')} pages.`}
          </Text>
        </Template>,
      ]
      const options = {
        id,
        context,
        properties: {
          ...props,
          style: fromSimpleStyle(props.style),
          templates: listViewChildren(createContextNode(props.iteratorName!)).map(c => c.properties),
        },
      }

      it('should create component', () => {
        expectComponentToBeCorrect(
          <ListView
            id={id}
            accessibility={props.accessibility}
            direction={props.direction}
            isScrollIndicatorVisible={props.isScrollIndicatorVisible}
            dataSource={props.dataSource!}
            iteratorName={props.iteratorName}
            key={props.key}
            onInit={props.onInit}
            onScrollEnd={props.onScrollEnd}
            scrollEndThreshold={props.scrollEndThreshold}
            style={props.style}
            context={context}
          >
            {listViewChildren}
          </ListView>,
          name,
          options,
        )
      })

      it('should throw when a child is not a Template', () => {
        expect(() =>
          <ListView dataSource={books}>
            {(item) => [
              <component name="customTemplate" namespace="ns" properties={{ case: item.get('id') }} />,
            ]}
          </ListView>
        ).toThrowError()
      })

      it('should throw when there are more than one TemplateWithoutCase', () => {
        expect(() =>
          <ListView dataSource={books}>
            {(item: MapContextNode<Book>) => [
              <Template>
                <Text>Audio book</Text>
                <Text>
                  {`${item.get('title')} was written by ${item.get('author')} `}
                </Text>
              </Template>,
              <Template>
                <Text>Physical book</Text>
                <Text>
                  {`${item.get('title')} was written by ${item.get('author')}. It has ${item.get('length')} pages.`}
                </Text>
              </Template>,
            ]}
          </ListView>
        ).toThrowError()
      })
    })

    describe('GridView', () => {
      type Book = { id: string, title: string, length: number, author: string, narrator?: string }
      const id = 'test-grid-view'
      const name = 'gridView'
      const context = createContext('grid-view-context')
      const books: Array<Book> = [
        {
          id: 'rhythm_of_war_#57',
          title: 'Rhythm of war',
          length: 57.5,
          author: 'Brandon Sanderson',
          narrator: 'Michael Kramer and Kate Reading',
        },
        {
          id: 'a_game_of_thrones_#819',
          title: 'A Game of Thrones',
          length: 819,
          author: 'George R.R. Martin',
        },
      ]
      const props: Partial<GridViewProps<Book>> = {
        accessibility: {
          accessible: true,
          accessibilityLabel: 'listView Accessibility Label',
          isHeader: false,
        },
        direction: 'HORIZONTAL',
        isScrollIndicatorVisible: true,
        dataSource: books,
        iteratorName: 'book',
        key: 'id',
        onInit: setContext({ contextId: 'list-view-context', value: [] }),
        onScrollEnd: alert('Scroll ended'),
        scrollEndThreshold: 98,
        itemAspectRatio: 1.2,
        spanCount: 4,
        style: {
          borderColor: '#000',
          backgroundColor: '#fff',
          padding: 10,
        },
      }
      const gridViewChildren = (item: MapContextNode<Book>) => [
        <Template>
          <Text>Audio book</Text>
          <Text>
            {`${item.get('title')} was written by ${item.get('author')} `}
          </Text>
        </Template>,
        <Template case={isNull(item.get('narrator'))}>
          <Text>Physical book</Text>
          <Text>
            {`${item.get('title')} was written by ${item.get('author')}. It has ${item.get('length')} pages.`}
          </Text>
        </Template>,
      ]
      const options = {
        id,
        context,
        properties: {
          ...props,
          style: fromSimpleStyle(props.style),
          templates: gridViewChildren(createContextNode(props.iteratorName!)).map(c => c.properties),
        },
      }

      it('should create component', () => {
        expectComponentToBeCorrect(
          <GridView
            id={id}
            accessibility={props.accessibility}
            direction={props.direction}
            isScrollIndicatorVisible={props.isScrollIndicatorVisible}
            dataSource={props.dataSource!}
            iteratorName={props.iteratorName}
            key={props.key}
            onInit={props.onInit}
            onScrollEnd={props.onScrollEnd}
            scrollEndThreshold={props.scrollEndThreshold}
            style={props.style}
            itemAspectRatio={props.itemAspectRatio}
            spanCount={props.spanCount}
            context={context}
          >
            {gridViewChildren}
          </GridView>,
          name,
          options,
        )
      })

      it('should throw when a child is not a Template', () => {
        expect(() =>
          <GridView dataSource={books}>
            {(item) => [
              <component name="customTemplate" namespace="ns" properties={{ case: item.get('id') }} />,
            ]}
          </GridView>
        ).toThrowError()
      })

      it('should throw when there are more than one TemplateWithoutCase', () => {
        expect(() =>
          <GridView dataSource={books}>
            {(item: MapContextNode<Book>) => [
              <Template>
                <Text>Audio book</Text>
                <Text>
                  {`${item.get('title')} was written by ${item.get('author')} `}
                </Text>
              </Template>,
              <Template>
                <Text>Physical book</Text>
                <Text>
                  {`${item.get('title')} was written by ${item.get('author')}. It has ${item.get('length')} pages.`}
                </Text>
              </Template>,
            ]}
          </GridView>
        ).toThrowError()
      })
    })
  })
})
