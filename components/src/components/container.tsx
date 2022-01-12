import { React, Actions, FC } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Theme } from '../types'

interface SpecificContainerProps {
  onInit?: Actions,
}

type ContainerProps = SpecificContainerProps & Theme & Style

export const Container: FC<ContainerProps> = ({ id, context, children, style, ...props }) => (
  <StyledDefaultComponent name="container" id={id} context={context} style={style} properties={props}>
    {children}
  </StyledDefaultComponent>
)
