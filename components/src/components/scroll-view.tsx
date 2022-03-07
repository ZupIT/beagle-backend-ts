import { BeagleJSX, FC, WithChildren, WithContext } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

export interface ScrollViewProps extends Required<WithChildren>, WithContext {
  /**
   * The direction of the scrolling.
   *
   * @default 'VERTICAL'
   */
  scrollDirection?: 'HORIZONTAL' | 'VERTICAL',
  /**
   * Whether or not to show a scroll bar.
   *
   * @default false
   */
  scrollBarEnabled?: boolean,
}

/**
 * Creates a Container that can be scrolled when its content overflows the space available.
 *
 * @example
 * ```tsx
 * <ScrollView>
 *   <>Long content</>
 * </ScrollView>
 * ```
 *
 * @category Component
 * @param props the component properties. See: {@link ScrollViewProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const ScrollView: FC<ScrollViewProps> = ({ id, context, children, ...props }) => (
  <DefaultComponent name="scrollView" id={id} context={context} properties={props}>
    {children}
  </DefaultComponent>
)
