import { BeagleJSX, FC, Actions, Component } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SpecificSimpleFormProps {
  ​onSubmit: Actions,
  onValidationError: Actions,
  children: Component[],
  context?: never,
}

type SimpleFormProps = SpecificSimpleFormProps & Accessibility & Theme & Style

export const SimpleForm: FC<SimpleFormProps> = ({ id, style, ...props }) =>
  <StyledDefaultComponent name="simpleForm" id={id} style={style} properties={props} />
