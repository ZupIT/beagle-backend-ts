import { BeagleJSX, FC, Actions, WithChildren } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface SimpleFormProps extends WithAccessibility, WithTheme, WithStyle, Required<WithChildren> {
  ​onSubmit: Actions,
  onValidationError?: Actions,
}

export const SimpleForm: FC<SimpleFormProps> = ({ id, style, children, ...props }) => (
  <StyledDefaultComponent name="simpleForm" id={id} style={style} properties={props}>
    {children}
  </StyledDefaultComponent>
)
