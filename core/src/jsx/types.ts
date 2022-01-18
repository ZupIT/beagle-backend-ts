import { Component } from '../model/component'

/**
 * Adds the common properties of a component to the type passed in the generic.
 *
 * Properties added: id
 */
export type ComponentProps<Props> = Pick<Component, 'id'> & Props

/**
 * A functional component. It receives the component properties and returns another JSX element.
 */
export type FC<Props = unknown> = (props: ComponentProps<Props>) => Component
