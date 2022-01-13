import { React, Actions, FC, WithChildren, WithContext } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface ContainerProps extends WithTheme, WithStyle, WithTheme, WithAccessibility, WithChildren, WithContext {
  onInit?: Actions,
}

export const Container: FC<ContainerProps> = ({ id, context, children, style, ...props }) => (
  <StyledDefaultComponent name="container" id={id} context={context} style={style} properties={props}>
    {children}
  </StyledDefaultComponent>
)
