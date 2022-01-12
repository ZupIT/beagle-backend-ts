import { React, FC, Component } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SpecificLazyProps {
  path: string,
  initialState: Component,
}

type LazyProps = SpecificLazyProps & Accessibility & Theme & Style

export const Lazy: FC<LazyProps> = ({ id, style, ...props }) =>
  <StyledDefaultComponent name="lazy" id={id} style={style} properties={props} />
