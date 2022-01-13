import { React, FC, Expression, Actions } from '@zup-it/beagle-backend-core'
import { WithTheme } from '../types'
import { DefaultComponent } from '../default-component'
import { Local as LocalImagePath } from './image'

interface TabBarItem {
  title?: string,
  icon?: LocalImagePath,
}

interface TabBarProps extends WithTheme {
  items: TabBarItem[],
  currentTab?: Expression<number>,
  onTabSelection?: Actions,
}

export const TabBar: FC<TabBarProps> = ({ id, ...props }) => (
  <DefaultComponent name="tabBar" id={id} properties={props} />
)
