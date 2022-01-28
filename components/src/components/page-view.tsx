import { Actions, BeagleJSX, Expression, FC, WithChildren, WithContext } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

interface PageViewProps extends WithChildren, WithContext {
  /**
   * Actions to run when the selected page is changed.
   */
  onPageChange?: Actions,
  /**
   * The current page.
   */
  currentPage?: number,
  /**
   * Whether or not to show page change arrows. Defaults to true.
   */
  showArrow?: boolean,
}

/**
 * PageView presents pages that are displayed horizontally that can hold multiple components.
 *
 * @param props {@link PageIndicatorProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const PageView: FC<PageViewProps> = ({ id, context, children, ...props }) => (
  <DefaultComponent name="pageView" id={id} context={context} properties={props}>
    {children}
  </DefaultComponent>
)
