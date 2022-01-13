import { BeagleJSX, FC, Expression, Actions } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SpecificTextInputProps {
  value: string,
  placeholder?: string,
  enabled?: boolean,
  readOnly?: boolean,
  type: 'DATE' | 'EMAIL' | 'NUMBER' | 'PASSWORD' | 'TEXT',
  styleId?: string,
  error?: string,
  showError?: Expression<boolean> | boolean,
  onFocus?: Actions,
  onChange?: Actions,
  onBlur?: Actions,
}

type TextInputProps = SpecificTextInputProps & Accessibility & Theme & Style

export const TextInput: FC<TextInputProps> = ({ id, style, ...props }) =>
  <StyledDefaultComponent name="textInput" id={id} style={style} properties={props} />
