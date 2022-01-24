import { BeagleJSX, FC, Actions, WithChild } from '@zup-it/beagle-backend-core'
import { SingleChildComponent } from '../default-component'

interface TouchableProps extends Required<WithChild> {
  /**
   * The actions to run when any of the child components are pressed or clicked.
   */
  onPress: Actions,
}

/**
 * Makes the children responsive for touch or click events. The behavior is similar to a Button.
 *
 * @param props {@link TouchableProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const Touchable: FC<TouchableProps> = ({ id, children, ...props }) => (
  <SingleChildComponent name="touchable" id={id} properties={props}>{children}</SingleChildComponent>
)
