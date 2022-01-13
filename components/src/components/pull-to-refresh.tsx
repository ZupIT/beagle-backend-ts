import { React, FC, Expression, Actions, WithChildren, WithContext } from '@zup-it/beagle-backend-core'
import { Color } from '../color'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility } from '../types'

interface PullToRefreshProps extends WithAccessibility, WithStyle, Required<WithChildren>, WithContext {
  onPull?: Actions,
  isRefreshing?: Expression<boolean>,
  color?: Expression<Color>,
}

export const PullToRefresh: FC<PullToRefreshProps> = ({ id, style, ...props }) =>
  <StyledDefaultComponent name="pullToRefresh" id={id} style={style} properties={props} />
