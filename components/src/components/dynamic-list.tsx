import {
  BeagleJSX,
  Actions,
  Expression,
  WithContext,
  AnyContextNode,
  ComponentProps,
  ContextNode,
  WithChildren,
  DynamicExpression,
} from '@zup-it/beagle-backend-core'
import { Container } from '.'
import { DefaultComponent } from '../default-component'
import { WithStyle } from '../style/styled'
import { WithAccessibility } from '../types'

interface TemplateProps extends WithChildren {
  case?: DynamicExpression<boolean>,
}

interface ListViewProps<T> extends WithContext, WithStyle, WithAccessibility {
  direction?: 'VERTICAL' | 'HORIZONTAL',
  onInit?: Actions,
  dataSource: Expression<T[]>,
  isScrollIndicatorVisible?: boolean,
  onScrollEnd?: Actions,
  scrollEndThreshold?: number,
  iteratorName?: string,
  key?: string,
  children: (item: AnyContextNode<T>) => JSX.Element | JSX.Element[],
}

interface GridViewProps<T> extends ListViewProps<T> {
  spanCount?: number,
}

type ListFC = <T>(props: ComponentProps<ListViewProps<T>>) => JSX.Element
type GridFC = <T>(props: ComponentProps<GridViewProps<T>>) => JSX.Element

export const Template = (props: TemplateProps) => {
  const children = Array.isArray(props.children) ? <Container>{props.children}</Container> : props.children
  return <component name="template" namespace="pseudo" properties={{ case: props.case, view: children }} />
}

function getTemplates<T>(iteratorName = 'item', children: ListViewProps<T>['children']) {
  let templateComponents = children(new ContextNode(iteratorName ?? 'item') as any)
  if (!Array.isArray(templateComponents)) templateComponents = [templateComponents]
  let hasDefaultTemplate = false
  return templateComponents.map((templateComponent) => {
    if (templateComponent.name !== 'template' || templateComponent.namespace !== 'pseudo') {
      throw new Error(
        `A ListView or GridView must only contain Template as children. Found ${templateComponent.namespace}:${templateComponent.name} instead.`,
      )
    }
    if (!templateComponent.properties?.case && hasDefaultTemplate) {
      throw new Error(
        'A ListView or GridView must contain zero or one default Template. Did you forget to set "case" for some of the Templates?',
      )
    }
    hasDefaultTemplate = hasDefaultTemplate || !templateComponent.properties?.case
    return templateComponent.properties
  })
}

export const ListView: ListFC = ({ id, context, children, ...props }) => (
  <DefaultComponent
    name="listView"
    id={id}
    context={context}
    properties={{ ...props, templates: getTemplates(props.iteratorName, children) }}
  />
)

export const GridView: GridFC = ({ id, context, children, ...props }) => (
  <DefaultComponent
    name="gridView"
    id={id}
    context={context}
    properties={{ ...props, templates: getTemplates(props.iteratorName, children) }}
  />
)
