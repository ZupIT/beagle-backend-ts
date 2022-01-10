import { React, FC, coreNamespace } from '@zup-it/beagle-backend-core'
import { validateColor } from '../validations'
import { fromSimpleStyle } from './converter'
import { SimpleStyle } from './simple-styles'

export interface Style {
  style?: SimpleStyle,
}

interface StyledComponentProps extends Style {
  name: string,
  namespace?: string,
  properties?: Record<string, any>,
}

export const StyledComponent: FC<StyledComponentProps> = ({
  name,
  style,
  children,
  context,
  id,
  namespace,
  properties,
}) => {
  validateColor(style?.backgroundColor)
  validateColor(style?.borderColor)
  // @ts-ignore todo: actually implement jsx and check these errors. This Error is shown only when compiling.
  return <component
    name={name}
    children={children}
    context={context}
    id={id}
    namespace={namespace}
    properties={{ ...fromSimpleStyle(style), ...properties }}
  />
}

export const StyledDefaultComponent: FC<Omit<StyledComponentProps, 'namespace'>> = props => (
  <StyledComponent {...props} namespace={coreNamespace} />
)
