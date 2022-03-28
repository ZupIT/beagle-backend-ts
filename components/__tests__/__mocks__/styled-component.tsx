import { BeagleJSX, coreNamespace } from '@zup-it/beagle-backend-core'
import { FC } from '@zup-it/beagle-backend-core'
import { StyledComponentProps } from '../../src/style/styled'

export const StyledComponentMock: FC<StyledComponentProps> = ({ children, name, style, ...props }) => {
  const expectedProperties = { style, ...props.properties }
  return (
    <component
      name={name}
      context={props.context}
      id={props.id}
      namespace={props.namespace ?? coreNamespace}
      properties={expectedProperties}>
      {children}
    </component>
  )
}
