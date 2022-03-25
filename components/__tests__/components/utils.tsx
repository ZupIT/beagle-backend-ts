import { BeagleJSX, Component, coreNamespace } from '@zup-it/beagle-backend-core'
import { LocalContext } from '@zup-it/beagle-backend-core/model/context/types'
import { Style } from '../../src/style/simple-styles'
import { StyledComponentProps } from '../../src/style/styled'
import { fromSimpleStyle } from '../../src/style/converter'

type ComponentTestOptions<Props> = {
  properties?: Partial<Props>,
  children?: Component | Component[] | null | undefined,
  id?: string,
  style?: Style,
  context?: LocalContext<any>,
  namespace?: string,
}

export function expectComponentToBeCorrect<Props>(
  component: JSX.Element,
  name: string,
  options: ComponentTestOptions<Props> = {},
) {
  const { properties, children, id, style, context, namespace } = options
  const expectedProperties = { style: fromSimpleStyle(style), ...properties }
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

export function mockStyledComponent() {
  jest.mock('src/style/styled', () => ({
    StyledComponent: ({ children, name, ...props }: StyledComponentProps) => (
      <component
        name={name}
        context={props.context}
        id={props.id}
        namespace={props.namespace ?? coreNamespace}
        properties={props}>
        {children}
      </component>
    ),
  }))
}
