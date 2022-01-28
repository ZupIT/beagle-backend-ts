import { Actions, AnyContextNode, BeagleJSX, createContextNode, Expression, FC, WithChildren, WithContext } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

interface PageViewProps extends WithChildren, WithContext {
  /**
   * An Action factory. This function receives a reference to the new value for the current page
   * and should return the actions to run once the page changes.
   */
  onPageChange?: (newCurrentPage: AnyContextNode<number>) => Actions,
  /**
   * The current page, i.e. the index of the child that should be displayed (0-based).
   */
  currentPage?: Expression<number>,
  /**
   * Whether or not to show arrows to change the current page in web platforms. Defaults to true.
   * These arrows are never shown in mobile platforms.
   */
  showArrow?: boolean,
}

/**
 * The PageView component displays each of its children as a page. A page is a vertical container that occupies all the
 * vertical space available, so only a single page is visible at a time. To determine which page is visible, i.e. which
 * child is visible, use the property `currentPage`. `currentPage` is the 0-based index corresponding to the child that
 * should be visible.
 *
 * In mobile platforms, the user can go to the next page by swiping right and go back to the previous page by swiping
 * left. In web platforms this can be done via arrows that are shown at the left side and right side of the page's
 * content. These arrows can be disabled via the property `showArrow`.
 *
 * Whenever a page changes via gesture (mobile) or click (web), the event `onPageChange` is triggered. This event is
 * useful for controlling other componentes that might be dependent on the index of the page that is being currently
 * shown, e.g. a PageIndicator. The property `onPageChange` expects an Action factory, i.e. a function that returns
 * all the actions that should be run when the page changes, this function receives a reference to the new page index
 * as parameter (a ContextNode).
 *
 * The PageView is often used with the PageIndicator, a set of bullet items equal to the number of pages where the one
 * with the most vibrant color represents the current page. See the example below:
 *
 * ```
 * const currentPage = createContext('currentPage', 0)
 *
 * const Screen = () => (
 *   <Container>
 *     <PageView context={currentPage} currentPage={currentPage} onPageChange={currentPage.set}>
 *       <Text>Page 1</Text>
 *       <Text>Page 2</Text>
 *       <Text>Page 3</Text>
 *     </PageView>
 *     <PageIndicator numberOfPages={3} currentPage={currentPage} selectedColor='#FF8C00' unselectedColor='#ffbe46' />
 *   </Container>
 * )
 * ```
 *
 * @param props {@link PageViewProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const PageView: FC<PageViewProps> = ({ id, context, onPageChange, children, ...props }) => {
  const onPageChangeActions = onPageChange ? onPageChange(createContextNode('onPageChange')) : undefined
  return (
    <DefaultComponent name="pageView" id={id} context={context}
      properties={{ ...props, onPageChange: onPageChangeActions }}>
      {children}
    </DefaultComponent>
  )
}
