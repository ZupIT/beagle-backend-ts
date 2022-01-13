import { BeagleJSX, FC, Expression, Actions } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface Path {
  url: string,
  mobileId: string,
}

interface TabBarItem {
  title?: string,
  icon: Path,
}

interface SpecificTabBarProps {
  items: TabBarItem[],
  styleId?: string,
  currentTab?: Expression<number>,
  onTabSelection?: Actions,
}

type TabBarProps = SpecificTabBarProps & Accessibility & Theme & Style

export const TabBar: FC<TabBarProps> = ({ id, style, ...props }) =>
  <StyledDefaultComponent name="tabBar" id={id} style={style} properties={props} />
