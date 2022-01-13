import { ComponentInterface } from '../model/component'

export type ComponentProps<Props> = Pick<ComponentInterface, 'id'> & Props

export type FC<Props = unknown> = (props: ComponentProps<Props>) => ComponentInterface
