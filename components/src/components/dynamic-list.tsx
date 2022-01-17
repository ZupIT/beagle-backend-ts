import {
  BeagleJSX,
  Actions,
  FC,
  Expression,
  Component,
  WithContext,
  AnyContextNode,
  ComponentProps,
} from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'
import { WithStyle } from '../style/styled'
import { WithAccessibility } from '../types'

interface TemplateProps {
  case?: Expression<boolean>,
  children: JSX.Element,
}

interface TemplateItem {
  case?: Expression<boolean>,
  view: JSX.Element,
}

type TemplateFC = (props: TemplateProps) => TemplateItem

interface ListViewProps<T> extends WithContext, WithStyle, WithAccessibility {
  direction?: 'VERTICAL' | 'HORIZONTAL',
  onInit?: Actions,
  dataSource: Expression<T[]>,
  isScrollIndicatorVisible?: boolean,
  onScrollEnd?: Actions,
  scrollEndThreshold?: number,
  iteratorName?: string,
  key?: string,
  children: (item: AnyContextNode<T>) => TemplateItem,
}

interface GridViewProps<T> extends ListViewProps<T> {
  spanCount?: number,
}

type ListFC = <T>(props: ComponentProps<ListViewProps<T>>) => JSX.Element
type GridFC = <T>(props: ComponentProps<ListViewProps<T>>) => JSX.Element

export const Template: TemplateFC = props => ({ case: props.case, view: props.children })

export const ListView: ListFC = ({ id, context, ...props }) => {
  return <DefaultComponent name="listView" id={id} context={context} properties={props} />
}

export const GridView: GridFC = ({ id, context, ...props }) => (
  <DefaultComponent name="gridView" id={id} context={context} properties={props} />
)
