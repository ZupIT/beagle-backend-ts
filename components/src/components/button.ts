import { Actions } from '@zup-it/ds-schema-core'
import { StyledComponent } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface ButtonParams {
  text: string,
  onPress?: Actions,
  enabled?: boolean,
}

export class Button extends StyledComponent<ButtonParams & Accessibility & Theme> {}
