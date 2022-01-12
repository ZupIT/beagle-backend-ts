import { ComponentInterface } from '../model/component'

type CommonProps = Omit<ComponentInterface, 'name' | 'namespace' | 'properties'>

type StripNevers<Props> = {
  [K in keyof Props as (Props[K] extends never ? never : K)]: Props[K]
}

export type ComponentProps<Props> = StripNevers<CommonProps & Props>

export type FC<Props = unknown> = (props: ComponentProps<Props>) => ComponentInterface
