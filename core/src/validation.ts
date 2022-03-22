import { remove } from 'lodash'
import { Component } from './model/component'

export interface ValidationNode extends Component {
  parent?: Component,
}

export type ValidationFn = (node: ValidationNode) => void

class ComponentValidation {
  private validations: ValidationFn[] = []

  /**
   * Adds a validation to the list of checks to perform. This validation is run for every component of the final UI
   * tree.
   *
   * The validation function must receive the validation node as parameter and return nothing. In case an error is
   * detected, an exception must be thrown.
   *
   * A {@link ValidationNode} is a {@link Component} with one additional attribute: the parent that spawned the node.
   *
   * @param validation the validation function.
   * @returns a function that, when called, removes the validation.
   */
  add(validation: ValidationFn): () => void {
    this.validations.push(validation)
    return () => {
      remove(this.validations, v => v === validation)
    }
  }

  private validateRecursive(node: Component, parent?: ValidationNode) {
    const current = { ...node, parent }
    this.validations.forEach(v => v(current))
    if (!node.children) return
    const children = Array.isArray(node.children) ? node.children : [node.children]
    children.forEach(c => this.validateRecursive(c, current))
  }

  /**
   * Checks a component tree for errors.
   *
   * @param tree the Component at the root of the tree to check.
   */
  run(tree: Component) {
    this.validateRecursive(tree)
  }
}

/**
 * Global object to register and run validations for the component tree. This is run just before the serialization and
 * is useful for checking nodes that depends on the rest of the tree.
 */
export const componentValidation = new ComponentValidation()
