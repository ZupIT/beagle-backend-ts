import { BeagleJSX, FC } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

export interface LazyProps {
  /**
   * The url to load the server-driven UI from. When relative, this path is relative to the `baseUrl`, set in the
   * configuration of Beagle, in the frontend.
   */
  path: string,
  /**
   * The UI tree to render while the one we actually want is not available.
   */
  children?: JSX.Element,
}

/**
 * Loads another UI tree from the given address and renders it into the current screen.
 *
 * This component optionally accepts a child. If a child is provided, it's used as the content displayed while the
 * screen is being loaded.
 *
 * @example
 * ```tsx
 * <LazyComponent path="/lazy-screen">
 *   <Text>Loading...</Text>
 * </LazyComponent>
 * ```
 *
 * @category Component
 * @param props the component properties. See: {@link LazyProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const LazyComponent: FC<LazyProps> = ({ id, children, ...props }) => (
  <DefaultComponent name="lazycomponent" id={id} properties={{ ...props, initialState: children }} />
)
