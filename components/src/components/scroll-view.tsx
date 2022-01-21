import { BeagleJSX, FC, WithChildren, WithContext } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

interface ScrollViewProps extends Required<WithChildren>, WithContext {
  /**
   * The direction of the scrolling. Defaults to 'VERTICAL'.
   */
  scrollDirection?: 'HORIZONTAL' | 'VERTICAL',
  /**
   * Whether or not to show a scroll bar. Defaults to true.
   */
  scrollBarEnabled?: boolean,
}

/**
 * Creates a Container that can be scrolled when its content overflows the space available.
 *
 * @param props {@link ScrollViewProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const ScrollView: FC<ScrollViewProps> = ({ id, context, children, ...props }) => (
  <DefaultComponent name="scrollView" id={id} context={context} properties={props}>
    {children}
  </DefaultComponent>
)
