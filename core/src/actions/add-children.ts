import { Expression } from '..'
import { Component } from '../model/component'
import { createCoreAction } from './core-action'

export interface AddChildrenParams {
  /**
   * The id of the component to receive the new elements.
   */
  componentId: string,
  /**
   * The array of components (nodes) to be added.
   */
  value: Expression<Component[]>,
  /**
   * The mode to attach the new nodes.
   *
   * - APPEND: adds the new nodes to the end of the list of children.
   * - PREPEND: adds the new nodes to the start of the list of children.
   * - REPLACE: replaces the entire array of children by the new nodes.
   *
   * @defaultValue `'APPEND'`
   */
  mode?: 'APPEND' | 'PREPEND' | 'REPLACE',
}

/**
 * Modifies the current component tree by adding a set of elements to an existing node. A simple example would be to
 * add a new row to the interface whenever a button is clicked:
 *
 * ```tsx
 * <>
 *   <Container id="inputGroup">
 *     <TextInput placeholder="name" />
 *   </Container>
 *   <Button onPress={addChildren({ componentId: 'inputGroup', value: [<TextInput placeholder="name" />] })}>
 *     Add more
 *   </Button>
 * </>
 * ```
 *
 * @category Actions
 * @param params the parameters for the action: componentId, value and mode. See {@link AddChildrenParams}.
 * @returns an instance of Action
 */
export const addChildren = createCoreAction<AddChildrenParams>('addChildren')
