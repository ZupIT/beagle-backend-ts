import { BeagleJSX, FC, Component } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'
import { Container } from './container'

interface LazyProps {
  /**
   * The url to load the server-driven UI from. When relative, this path is relative to the `baseUrl`, set in the
   * configuration of Beagle, in the frontend.
   */
  path: string,
  /**
   * The UI tree to render while the one we actually want is not available.
   */
  initialState?: Component,
}

/**
 * Loads another UI tree from the given address and renders it into the current screen.
 *
 * @param props {@link LazyProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const LazyComponent: FC<LazyProps> = ({ id, ...props }) => {
  props.initialState ??= <Container />
  return <DefaultComponent name="lazycomponent" id={id} properties={props} />
}
