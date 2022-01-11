import { React, FC } from '@zup-it/beagle-backend-core'
import { Color } from '../color'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'
import { validateColor } from '../validations'

interface SpecificTextProps {
  text: string,
  textColor?: Color,
  alignment?: 'LEFT' | 'CENTER' | 'RIGHT',
  context: never,
  children: never,
}

type TextProps = SpecificTextProps & Accessibility & Theme & Style

export const Text: FC<TextProps> = ({ id, ...props }) => {
  validateColor(props.textColor)
  return <StyledDefaultComponent name="text" id={id} properties={props} />
}
