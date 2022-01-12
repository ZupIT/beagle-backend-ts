import { React, Actions, FC, Expression, Component } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

interface TemplateManagerItem {
  case: Expression<boolean>,
  view: Component,
}

interface ListViewProps {
  direction?: 'VERTICAL' | 'HORIZONTAL',
  onInit?: Actions,
  dataSource: Expression<any[]>,
  templates: TemplateManagerItem[],
  isScrollIndicatorVisible?: boolean,
  onScrollEnd?: Actions,
  scrollEndThreshold?: number,
  iteratorName?: string,
  key?: string,
  children: never,
}

interface GridViewProps extends ListViewProps {
  spanCount?: number,
}

export const ListView: FC<ListViewProps> = ({ id, context, ...props }) => (
  <DefaultComponent name="listView" id={id} context={context} properties={props} />
)

export const GridView: FC<GridViewProps> = ({ id, context, ...props }) => (
  <DefaultComponent name="gridView" id={id} context={context} properties={props} />
)
