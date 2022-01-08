import { Actions } from '@zup-it/beagle-backend-core'
import { StyledComponent } from '../style/styled'
import { Theme } from '../types'

interface SpecificContainerProps {
  onInit: Actions,
}

type ContainerProps = SpecificContainerProps & Theme

export class Container extends StyledComponent<ContainerProps> {}
