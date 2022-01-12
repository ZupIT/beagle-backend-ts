import { React, FC, Actions, Component } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SpecificTouchableProps {
  onPress: Actions,
  child: Component,
}

type TouchableProps = SpecificTouchableProps & Accessibility & Theme & Style

export const Touchable: FC<TouchableProps> = ({ id, style, ...props }) =>
  <StyledDefaultComponent name="touchable" id={id} style={style} properties={props} />
