import { Component, isDynamicExpression } from '../..'
import { FragmentFactory } from './types'

const stringable = (value: any) => !(value instanceof Component)
const createContainer = (children: any[]) => new Component({ namespace: 'beagle', name: 'container', children })
const createText = (text: string) => new Component({ namespace: 'beagle', name: 'text', properties: { text } })
const formatTextUnit = (text: any) => (
  ((text && typeof text === 'object') && !isDynamicExpression(text)) ? JSON.stringify(text) : text
)

export const beagleFragmentFactory: FragmentFactory = (children: any[]) => {
  const iterableChildren = Array.isArray(children) ? children : [children]
  const childrenBuilt = iterableChildren.reduce((accumulator: Component[], value: any, index: number) => {
    const previousComponent = accumulator[accumulator.length - 1]
    if (index > 0 && previousComponent.name === 'text' && stringable(value)) {
      previousComponent!.properties!.text = `${previousComponent!.properties!.text}${formatTextUnit(value)}`
      return accumulator
    }
    const newItem = stringable(value) ? createText(formatTextUnit(value)) : value
    return [...accumulator, newItem]
  }, [])

  return childrenBuilt.length === 1 ? childrenBuilt[0] : createContainer(childrenBuilt)
}
