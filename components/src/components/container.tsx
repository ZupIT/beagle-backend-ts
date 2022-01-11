import { React, Actions, FC } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Theme } from '../types'

interface SpecificContainerProps {
  onInit?: Actions,
}

type ContainerProps = SpecificContainerProps & Theme & Style

export const Container: FC<ContainerProps> = ({ context, children, ...props }) => (
  <StyledDefaultComponent name="container" context={context} children={children} properties={props} />
)
