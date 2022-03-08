import {
  BeagleJSX,
  Actions,
  Expression,
  WithContext,
  AnyContextNode,
  ComponentProps,
  createContextNode,
  WithChildren,
  DynamicExpression,
  componentValidation,
} from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'
import { WithStyle } from '../style/styled'
import { WithAccessibility } from '../types'
import { Container } from './container'

export interface TemplateProps extends WithChildren {
  /**
   * If the expression resolves to true, this template will be used for the current iteration. When not set, the
   * template is considered to be the default.
   */
  case?: DynamicExpression<boolean>,
}

export interface ListViewProps<T> extends WithContext, WithStyle, WithAccessibility {
  /**
   * The direction of the list or grid. This indicates the direction it grows to when items are added.
   *
   * @defaultValue `'VERTICAL'`
   */
  direction?: 'VERTICAL' | 'HORIZONTAL',
  /**
   * Actions to run as soon as the list or grid appears in the screen for the first time. Attention: it doesn't run
   * again if the user navigates to another page and then comes back (popView).
   */
  onInit?: Actions,
  /**
   * The array of elements to iterate over. Most of the times, this will be a reference to an array in a Context.
   */
  dataSource: Expression<T[]>,
  /**
   * Whether to show or not a scroll bar.
   *
   * @defaultValue `false`
   */
  isScrollIndicatorVisible?: boolean,
  /**
   * Actions to run when the user reaches a certain threshold of the scroll. This is useful for creating infinite
   * scrolls. The default threshold is 80%, but it can be customized via the property `scrollEndThreshold`.
   *
   * This event is triggered whenever the full list is visible in the screen without the need to scroll. So, when
   * building an infinite scroll, use only this and ignore the property "onInit".
   *
   * Once this event is triggered, it can only be triggered again when the `dataSource` changes in size.
   */
  onScrollEnd?: Actions,
  /**
   * The threshold for triggering `onScrollEnd`. Must be between 0 and 100.
   *
   * @defaultValue `80`
   */
  scrollEndThreshold?: number,
  /**
   * The default id for the implicit context that refers to the current iteration is "item". This property allows you
   * to change this id. It's useful for preventing a context from being obscured by another.
   */
  iteratorName?: string,
  /**
   * Tells the frontend which property of the items in the dataset is able to identify them. This is useful for
   * rendering only what's necessary when the list changes. Set this property whenever possible to enhance performance.
   */
  key?: keyof T,
  /**
   * A Template factory. It receives the implicit context corresponding to the current iteration. It must return a
   * Template or a list of Templates. No other component is acceptable.
   */
  children: (item: AnyContextNode<T>) => JSX.Element | JSX.Element[],
}

export interface GridViewProps<T> extends ListViewProps<T> {
  /**
   * Maximum number of items in the axis opposite to the direction.
   */
  spanCount?: number,
  /**
   * Only valid for Flutter. This sets the aspect ratio of the items in the grid. If left in blank, the items will be
   * squares (itemAspectRatio = 1). The Flutter GridView doesn't accept items with arbitrary size.
   */
  itemAspectRatio?: number,
}

type ListFC = <T>(props: ComponentProps<ListViewProps<T>>) => JSX.Element
type GridFC = <T>(props: ComponentProps<GridViewProps<T>>) => JSX.Element

/**
 * A Template for a ListView or GridView. The Template can only be used as children of a ListView or a GridView, placing
 * it anywhere else is wrong.
 *
 * A Template has a single property and its children. The single property, "case", is optional and it tells if this
 * template should be used for the current iteration or not. If "case" is omitted, the template is considered to be the
 * default.
 *
 * This Component is a pseudo-component, i.e. it will not translate into a real component when serialized. Instead, it
 * will transform into the property "templates" of the ListView and GridView, as expected by the frontend.
 *
 * Check the documentation for the {@link ListView} for examples.
 *
 * @category Component
 * @param props {@link TemplateProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const Template = (props: TemplateProps) => {
  const children = Array.isArray(props.children) ? <Container>{props.children}</Container> : props.children
  return <component name="template" namespace="pseudo" properties={{ case: props.case, view: children }} />
}

function getTemplates<T>(iteratorName = 'item', children: ListViewProps<T>['children']) {
  let templateComponents = children(createContextNode(iteratorName ?? 'item'))
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

/**
 * This is Beagle's iterative structure. Use this component to loop over a set and build the UI according to a given
 * template and the current iteration.
 *
 * The 2 most important properties of this component are the dataSource and the children. The first is the set we are
 * going to iterate over, while the second is the template we're going to use.
 *
 * The children of this component is different than the usual. Instead of placing the JSX as the direct children, we
 * must place a function that returns the JSX. This is because Beagle needs to inject the context corresponding to the
 * current item of the iteration, so it can be referenced by the template.
 *
 * Furthermore, the children function, must return a JSX corresponding to a Template. Otherwise, it will raise an
 * exception at server runtime (not in the frontend).
 *
 * @example
 * ```tsx
 * const users = [{ name: 'John', age: 30 }, { name: 'Sophia', age: 32 }, { name: 'Rebeca', age: 5 }]
 *
 * const MyScreen = () => (
 *   <ListView dataSource={users}>
 *     {(item) => (
 *       <Template>
 *         <Text>{`${item.get('name')} is ${item.get('age')} years old.`}</Text>
 *       </Template>
 *     )}
 *   </ListView>
 * )
 * ```
 *
 * The example above will render a screen with the following text:
 * John is 30 years old.
 * Sophia is 32 years old.
 * Rebeca is 5 years old.
 *
 * More complex data sets might require different templates depending on the item. Let's say we have an array with
 * physical books and audio books and their templates should look a bit different from one another. See the example
 * below:
 * ```tsx
 * const books = [
 *   { title: 'Rhythm of war', length: 57.5, author: 'Brandon Sanderson', narrator: 'Michael Kramer and Kate Reading' },
 *   { title: 'A Game of Thrones', length: 819, author: 'George R.R. Martin' },
 * ]
 *
 * const MyScreen = () => (
 *   <ListView dataSource={books}>
 *     {(item) => [
 *       <Template>
 *         <Text>Audio book</Text>
 *         <Text>
 *           {`${item.get('title')} was written by ${item.get('author')} and narrated by ${item.get('narrator')}. It has ${item.get('length')} minutes.`}
 *         </Text>
 *       </Template>,
 *       <Template case={isNull(item.get('narrator'))}>
 *         <Text>Physical book</Text>
 *         <Text>
 *           {`${item.get('title')} was written by ${item.get('author')}. It has ${item.get('length')} pages.`}
 *         </Text>
 *       </Template>
 *     ]}
 *   </ListView>
 * )
 * ```
 *
 * Notice that now, instead of returning a single template, we return a list of templates. To identify the template
 * to use with the item, the condition at "case" will be checked. When "case" is not present, we assume it to be the
 * default template. If more than one default template is found, an exception is thrown at server runtime. If no
 * default template exists and an item doesn't match any of the conditions, it gets ignored.
 *
 * @category Component
 * @param props the properties for this component. See: {@link ListViewProps}.
 * @returns a JSX element, i.e an instance of Component.
 */
export const ListView: ListFC = ({ id, context, children, ...props }) => (
  <DefaultComponent
    name="listView"
    id={id}
    context={context}
    properties={{ ...props, templates: getTemplates(props.iteratorName, children) }}
  />
)

/**
 * The same as a ListView component, but instead of arranging the items as a list, it arranges them as a grid. To
 * manipulate the number of elements per row, use `direction = 'VERTICAL'` and `spanCount = maxRows`. To manipulate the
 * number of elements per column use `direction = 'HORIZONTAL'` and `spanCount = maxColumns`.
 *
 * Please, check the documentation for the {@link ListView} for more details.
 *
 * @category Component
 * @param props the properties for this component. See: {@link GridViewProps}.
 * @returns a JSX element, i.e an instance of Component.
 */
export const GridView: GridFC = ({ id, context, children, ...props }) => (
  <DefaultComponent
    name="gridView"
    id={id}
    context={context}
    properties={{ ...props, templates: getTemplates(props.iteratorName, children) }}
  />
)

componentValidation.add((node) => {
  if (node.namespace === 'pseudo' && node.name === 'template') {
    throw new Error(
      'The component "Template" must be a direct child of one of these components: "ListView", "GridView".',
    )
  }
})
