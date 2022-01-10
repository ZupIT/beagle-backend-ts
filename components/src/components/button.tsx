import { React, Actions, FC } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SpecificButtonProps {
  text: string,
  onPress?: Actions,
  enabled?: boolean,
  children: never,
  context: never,
}

type ButtonProps = SpecificButtonProps & Accessibility & Theme & Style

export const Button: FC<ButtonProps> = ({ id, ...props }) => (
  <StyledDefaultComponent name="button" id={id} properties={props} />
)
