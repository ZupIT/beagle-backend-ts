import { BeagleJSX, DynamicExpression, FC } from '@zup-it/beagle-backend-core'
import { condition as conditionalOperation } from '@zup-it/beagle-backend-core/operations'
import { set } from 'lodash'
import { Container } from '..'

interface ParentProps {
  condition: DynamicExpression<boolean>,
  children: [JSX.Element, JSX.Element?],
}

interface ChildrenProps {
  children: JSX.Element,
}

const validateChild = (child?: JSX.Element) => {
  if (!child) return
  const { name, namespace } = child
  const isValid = namespace === 'fake' && ['then', 'else'].includes(name)
  if (!isValid) {
    throw new Error(
      `The If component must only have the components Then and Else as children. Received: ${namespace}${name}`,
    )
  }
}

/**
 * This is a helper component. It makes it easier to make conditional rendering with the styles. This should always
 * be used with its Then and Else companions. See the example below:
 *
 * Suppose `isLoading` is a Context and it stores a boolean value.
 *
 * ```
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
 * ```
 * <Container>
 *   <Text style={{ display: condition(isLoading, 'FLEX', 'NONE') }}>Loading...</Text>
 *   <Text style={{ display: condition(isLoading, 'NONE', 'FLEX') }}>Loading is completed!</Text>
 * </Container>
 * ```
 *
 * @param props {@link ParentProps}
 * @returns a Container with the child of Then and the child of Else with the proper style.display.
 */
export const If: FC<ParentProps> = ({ id, condition, children }) => {
  children.forEach(validateChild)
  const thenComponent = children.find(c => c?.name === 'then')?.children as JSX.Element | undefined
  const elseComponent = children.find(c => c?.name === 'else')?.children as JSX.Element | undefined

  if (!thenComponent) throw Error('The If component must have the component Then as child')
  set(thenComponent, 'properties.style.display', conditionalOperation(condition, 'FLEX', 'NONE'))

  if (elseComponent) {
    set(elseComponent, 'properties.style.display', conditionalOperation(condition, 'NONE', 'FLEX'))
    return (
      <Container id={id}>
        {thenComponent}
        {elseComponent}
      </Container>
    )
  }

  return thenComponent
}

/**
 * Should only be used inside an If component. See {@link If} for more details.
 *
 * @param props {@link ChildrenProps}
 * @returns a Component that won't be serialized with metadata to the parent If.
 */
export const Then = ({ children }: ChildrenProps) => <component namespace="fake" name="then">{children}</component>

/**
 * Should only be used inside an If component. See {@link If} for more details.
 *
 * @param props {@link ChildrenProps}
 * @returns a Component that won't be serialized with metadata to the parent If.
 */
export const Else = ({ children }: ChildrenProps) => <component namespace="fake" name="else">{children}</component>
