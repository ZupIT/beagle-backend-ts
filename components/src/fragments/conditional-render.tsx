import { BeagleJSX, componentValidation, Expression, FC } from '@zup-it/beagle-backend-core'
import { condition as conditionalOperation } from '@zup-it/beagle-backend-core/operations'
import { set } from 'lodash'
import { Container, WithStyle } from '..'

export interface IfProps extends WithStyle {
  condition: Expression<boolean>,
  children: JSX.Element | [JSX.Element, JSX.Element],
}

export interface ThenElseProps {
  children: JSX.Element,
}

const validateChild = (child?: JSX.Element) => {
  if (!child) return
  const { name, namespace } = child
  const isValid = namespace === 'pseudo' && ['then', 'else'].includes(name)
  if (!isValid) {
    throw new Error(
      `The If component must only have the components Then and Else as children. Received: ${namespace}:${name}.`,
    )
  }
}

/**
 * This is a helper component. It makes it easier to make conditional rendering with the styles. This should always
 * be used with its Then and Else companions. See the example below:
 *
 * Suppose `isLoading` is a Context and it stores a boolean value.
 *
 * @example
 * ```tsx
 * <If condition={isLoading}>
 *   <Then><Text>Loading...</Text></Then>
 *   <Else><Text>Loading is completed!</Text></Else>
 * </If>
 * ```
 *
 * The children of If must always be a Then and an Else. The Else being optional.
 *
 * This is a helper component because when serialized it doesn't turn into a real component in the tree. The example
 * above is the equivalent of writing:
 *
 * ```tsx
 * <Container>
 *   <Text style={{ display: condition(isLoading, 'FLEX', 'NONE') }}>Loading...</Text>
 *   <Text style={{ display: condition(isLoading, 'NONE', 'FLEX') }}>Loading is completed!</Text>
 * </Container>
 * ```
 *
 * If you pass `id` or `style` to the component `If`, they will end up in the enclosing container that will be created.
 *
 * When `If` has only `Then` as a child, no enclosing Container is created and its id and style are used for rendering
 * the child of `Then`. We will try to combine every property, but if there are clashes, the child of `Then` takes
 * precedence.
 *
 * ```tsx
 * <If id="if-component" style={{ margin: 5, backgroundColor: '#000000' }} condition={isLoading}>
 *   <Then><Text id="text-component" style={{ padding: 10, backgroundColor: '#FFFFFF' }}>Loading...</Text></Then>
 * </If>
 * ```
 *
 * becomes:
 * ```tsx
 * <Text
 *   id="text-component"
 *   style={{ display: condition(isLoading, 'FLEX', 'NONE'), margin: 5, padding: 10, backgroundColor: '#FFFFFF' }}
 * >
 *   Loading...
 * </Text>
 * ```
 *
 * @category Component
 * @param props the component properties. See: {@link IfProps}
 * @returns a Container with the child of Then and the child of Else with the proper style.display. Or the child of
 * Then, with no enclosing container, if no Else is provided.
 */
export const If: FC<IfProps> = ({ id, style, condition, children }) => {
  const thenAndElse = Array.isArray(children) ? children : [children]
  thenAndElse.forEach(validateChild)
  const thenComponent = thenAndElse.find(
    c => `${c?.namespace}:${c?.name}` === 'pseudo:then',
  )?.children as JSX.Element | undefined
  const elseComponent = thenAndElse.find(
    c => `${c?.namespace}:${c?.name}` === 'pseudo:else',
  )?.children as JSX.Element | undefined

  if (!thenComponent) throw Error('The If component must have the component Then as child')
  set(thenComponent, 'properties.style.display', conditionalOperation(condition, 'FLEX', 'NONE'))

  if (elseComponent) {
    set(elseComponent, 'properties.style.display', conditionalOperation(condition, 'NONE', 'FLEX'))
    return (
      <Container id={id} style={style}>
        {thenComponent}
        {elseComponent}
      </Container>
    )
  }

  if (style) set(thenComponent, 'properties.style', { ...style, ...thenComponent.properties?.style })
  if (id && !thenComponent.id) thenComponent.id = id
  return thenComponent
}

/**
 * Should only be used inside an If component. See {@link If} for more details.
 *
 * @category Component
 * @param props the component properties. See: {@link ThenElseProps}
 * @returns a Component that won't be serialized with metadata to the parent If.
 */
export const Then = ({ children }: ThenElseProps) => <component namespace="pseudo" name="then">{children}</component>

/**
 * Should only be used inside an If component. See {@link If} for more details.
 *
 * @category Component
 * @param props the component properties. See: {@link ThenElseProps}
 * @returns a Component that won't be serialized with metadata to the parent If.
 */
export const Else = ({ children }: ThenElseProps) => <component namespace="pseudo" name="else">{children}</component>

componentValidation.add((node) => {
  if (node.namespace === 'pseudo' && node.name === 'then') {
    throw new Error('The component "Then" must be a direct child of the component "If".')
  }
  if (node.namespace === 'pseudo' && node.name === 'else') {
    throw new Error('The component "Else" must be a direct child of the component "If".')
  }
})
