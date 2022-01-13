import { BeagleJSX, FC, coreNamespace } from '@zup-it/beagle-backend-core'

interface DefaultComponentProps {
  name: string,
  properties?: Record<string, any>,
}

export const DefaultComponent: FC<DefaultComponentProps> = ({ children, ...props }) => (
  // @ts-ignore todo: actually implement jsx and check these errors. This Error is shown only when compiling.
  <component {...props} namespace={coreNamespace}>{children}</component>
)
