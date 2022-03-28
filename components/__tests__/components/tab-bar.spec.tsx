import { Actions, BeagleJSX, Context, createContext, createContextNode } from '@zup-it/beagle-backend-core'
import { TabBar, TabBarProps } from '../../src/components/tab-bar'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('TabBar', () => {
    const name = 'tabBar'
    const id = 'test-tab-bar'
    const currentTab = createContext('tab', 0)
    const onTabSelection: (index: Context<number>) => Actions = (value) => currentTab.set(value)
    const props: TabBarProps = {
      currentTab,
      items: [{ title: 'John' }, { title: 'Sophia' }, { title: 'Mark' }],
      onTabSelection: onTabSelection,
      styleId: 'test-tab-bar-style-id',
    }
    const options = {
      id,
      properties: {
        ...props,
        onTabSelection: onTabSelection(createContextNode('onTabSelection')),
      },
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <TabBar
          id={id}
          items={props.items!}
          currentTab={props.currentTab}
          onTabSelection={(value) => currentTab.set(value)}
          styleId={props.styleId}
        />,
        name,
        options,
      )
    })
  })
})
