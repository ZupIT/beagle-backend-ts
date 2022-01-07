import { Actions } from '@zup-it/ds-schema-core'
import { StyledComponent } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SpecificButtonProps {
  text: string,
  onPress?: Actions,
  enabled?: boolean,
}

type ButtonProps = SpecificButtonProps & Accessibility & Theme

export class Button extends StyledComponent<ButtonProps, 'without-context'> {}
