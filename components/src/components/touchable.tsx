import { BeagleJSX, FC, Actions, WithChildren } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'
import { Container } from './container'

export interface TouchableProps extends Required<WithChildren> {
  /**
   * The actions to run when any of the child components are pressed or clicked.
   */
  onPress: Actions,
}

/**
 * Makes the children responsive for touch or click events. The behavior is similar to a Button.
 *
 * @example
 * ```tsx
 * <Touchable onPress={alert('Hello World!')}>
 *   <Image type="remote" url="https://my-backend/my-image.png" />
 * </Touchable>
 * ```
 *
 * @category Component
 * @param props the component properties. See: {@link TouchableProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const Touchable: FC<TouchableProps> = ({ id, children, ...props }) => {
  // the frontend always expect a single child for the Touchable component
  const child = Array.isArray(children) ? <Container>{children}</Container> : children
  return <DefaultComponent name="touchable" id={id} properties={{ ...props, child }} />
}
