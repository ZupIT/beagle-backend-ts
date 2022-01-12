import { React, FC, Expression, Actions, Component } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SpecificPullToRefreshProps {
  context?: never,
  onPull?: Actions,
  isRefreshing?: Expression<boolean> | boolean,
  color?: Expression<string> | string,
  child: Component,
}

type PullToRefreshProps = SpecificPullToRefreshProps & Accessibility & Theme & Style

export const PullToRefresh: FC<PullToRefreshProps> = ({ id, style, ...props }) =>
  <StyledDefaultComponent name="pullToRefresh" id={id} style={style} properties={props} />
