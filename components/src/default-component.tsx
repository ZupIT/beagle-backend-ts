import { BeagleJSX } from './jsx'
import { FC, coreNamespace, WithContext, WithChildren } from '@zup-it/beagle-backend-core'

interface DefaultComponentProps extends WithContext, WithChildren {
  name: string,
  properties?: Record<string, any>,
}

export const DefaultComponent: FC<DefaultComponentProps> = ({ children, context, ...props }) => (
  // @ts-ignore todo: actually implement jsx and check these errors. This Error is shown only when compiling.
  <component {...props} context={context} namespace={coreNamespace}>{children}</component>
)
