import { BeagleJSX, Component, coreNamespace } from '@zup-it/beagle-backend-core'
import { LocalContext } from '@zup-it/beagle-backend-core/model/context/types'
import { Style } from '../../src/style/simple-styles'

export type ComponentTestOptions<Props = unknown> = {
  properties?: Props,
  children?: Component | Component[] | null | undefined,
  id?: string,
  style?: Style,
  context?: LocalContext<any>,
  namespace?: string,
}

export function expectComponentToBeCorrect<Props = unknown>(
  component: JSX.Element,
  name: string,
  options: ComponentTestOptions<Props> = {},
) {
  const { id, style, context, namespace, children, properties } = options
  const expectedProperties = { style, ...properties }
  const expectedComponent = (
    <component
      name={name}
      context={context}
      id={id}
      namespace={namespace ?? coreNamespace}
      properties={expectedProperties}>
      {children}
    </component>
  )
  expect(component).toEqual(expectedComponent)
}
