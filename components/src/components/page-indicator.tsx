import { BeagleJSX, FC, Expression } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'
import { validateColor } from '../validations'

interface PageIndicatorProps {
  /**
   * Color to use for the current page.
   */
  selectedColor: string,
  /**
   * Color to use for all pages, but the current.
   */
  unselectedColor: string,
  /**
   * Total number of pages.
   */
  numberOfPages?:	number,
  /**
   * The current page.
   */
  currentPage?:	Expression<number>,
}

/**
 * UI element to show the current page. General used inside a PageView.
 *
 * @param props {@link PageIndicatorProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const PageIndicator: FC<PageIndicatorProps> = ({ id, ...props }) => {
  validateColor(props.selectedColor)
  validateColor(props.unselectedColor)
  return <DefaultComponent name="pageIndicator" id={id} properties={props} />
}
