import { BeagleJSX, Actions, FC, WithChildren, WithContext } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

export interface ContainerProps extends WithTheme, WithStyle, WithTheme, WithAccessibility, WithChildren, WithContext {
  /**
   * Actions to run as soon as the container appears in the screen for the first time. Attention: it doesn't run
   * again if the user navigates to another page and then comes back (popView).
   */
  onInit?: Actions,
}


/**
 * A container that can hold multiple components. It can also be used to create square or circular shapes with the
 * "style" property. If you're familiar with web applications, this is similar to a div element.
 *
 * @example
 * ```tsx
 * <Container>
 *   <Text>Hello</Text>
 *   <Text>World</Text>
 * <Container>
 * ```
 *
 * @category Component
 * @param props the properties for this component. See: {@link ContainerProps}.
 * @returns a JSX element, i.e an instance of Component.
 */
export const Container: FC<ContainerProps> = ({ id, context, children, style, ...props }) => (
  <StyledDefaultComponent name="container" id={id} context={context} style={style} properties={props}>
    {children}
  </StyledDefaultComponent>
)
