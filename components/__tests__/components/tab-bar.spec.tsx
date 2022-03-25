import { Actions, BeagleJSX, Context, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { TabBar } from '../../src/components/tab-bar'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('TabBar', () => {
    const name = 'tabBar'
    const id = 'test-tab-bar'
    const currentTab = createContext('tab', 0)
    const onTabSelection: (index: Context<number>) => Actions = (value) => currentTab.set(value)
    const onTabSelectionActions = onTabSelection(createContextNode('onTabSelection'))
    const properties: Record<string, any> = {
      currentTab,
      items: [{ title: 'John' }, { title: 'Sophia' }, { title: 'Mark' }],
      onTabSelection: onTabSelectionActions,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <TabBar
          id={id}
          items={properties.items}
          currentTab={properties.currentTab}
          onTabSelection={(value) => currentTab.set(value)}
        />,
        name,
        { id, properties, children: undefined },
      )
    })
  })
})
