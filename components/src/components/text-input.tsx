import { React, FC, Expression, Actions } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface TextInputProps extends WithAccessibility, WithTheme, WithStyle {
  value?: Expression<string>,
  placeholder?: Expression<string>,
  enabled?: boolean,
  readOnly?: boolean,
  type?: Expression<'DATE' | 'EMAIL' | 'NUMBER' | 'PASSWORD' | 'TEXT'>,
  styleId?: string,
  error?: Expression<string>,
  showError?: Expression<boolean>,
  onFocus?: Actions,
  onChange?: Actions,
  onBlur?: Actions,
}

export const TextInput: FC<TextInputProps> = ({ id, style, ...props }) => (
  <StyledDefaultComponent name="textInput" id={id} style={style} properties={props} />
)
