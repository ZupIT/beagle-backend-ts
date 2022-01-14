import { Component } from '../model/component'

export type ComponentProps<Props> = Pick<Component, 'id'> & Props

export type FC<Props = unknown> = (props: ComponentProps<Props>) => Component
