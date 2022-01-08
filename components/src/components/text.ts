import { StyledComponent } from '../style/styled'
import { Accessibility, Color, Theme } from '../types'

interface SpecificTextProps {
  text: string,
  textColor: Color,
  alignment: 'LEFT' | 'CENTER' | 'RIGHT',
}

type TextProps = SpecificTextProps & Accessibility & Theme

export class Text extends StyledComponent<TextProps, 'without-context'> {}
