import { BeagleJSX, FC, Expression, Actions, Context, createContextNode } from '@zup-it/beagle-backend-core'
import { WithTheme } from '../types'
import { DefaultComponent } from '../default-component'
import { LocalImageProps } from './image'

export interface TabBarItem {
  /**
   * The text inside the tab selector.
   */
  title?: string,
  /**
   * The icon to put at the title's side. This must be the path for a local image, i.e. an object containing a url and
   * mobileId. Check the documentation for the Image component for more details.
   */
  icon?: LocalImageProps,
}

export interface TabBarProps extends WithTheme {
  /**
   * The tabs.
   */
  items: TabBarItem[],
  /**
   * The index of the selected tab. 0 is the first tab.
   */
  currentTab?: Expression<number>,
  /**
   * An Action factory. This function receives a ContextNode referencing the index of the selected tab and must return
   * the actions to run when the tab changes.
   */
  onTabSelection?: (index: Context<number>) => Actions,
}

/**
 * Renders a set of tab selectors. This is generally used in conjunction with a PageView.
 *
 * The tabs are identified by their index, which is zero-based, i.e. to tell the first tab is selected, use
 * `currentTab={0}`. This index is also the value received by the function passed in `onTabSelection`.
 *
 * @example
 * ```tsx
 * const currentTab = createContext('tab', 0)
 * const tabs = [{ title: 'John' }, { title: 'Sophia' }, { title: 'Mark' }]
 *
 * const MyScreen = () => (
 *   <Container context={currentTab}>
 *     <TabBar items={tabs} currentTab={currentTab} onTabSelection={value => currentTab.set(value)} />
 *     <PageView currentPage={currentTab}>
 *       <Text>This is John</Text>
 *       <Text>This is Sophia</Text>
 *       <Text>This is Mark</Text>
 *     </PageView>
 *   </Container>
 * )
 * ```
 *
 * The example above will render a tab selector that tells which child the Page View will show.
 *
 * @category Component
 * @param props the component properties. See: {@link TabBarProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const TabBar: FC<TabBarProps> = ({ id, onTabSelection, ...props }) => {
  const onTabSelectionActions = onTabSelection ? onTabSelection(createContextNode('onTabSelection')) : undefined
  return <DefaultComponent name="tabBar" id={id} properties={{ ...props, onTabSelection: onTabSelectionActions }} />
}
