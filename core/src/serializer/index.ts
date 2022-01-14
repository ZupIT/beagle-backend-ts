import { isEmpty, mapValues } from 'lodash'
import { genericNamespace } from '../constants'
import { Component } from '../model/component'
import { Action } from '../model/action'
import { AnyRootContext } from '../model/context/types'
import { ContextNode } from '../model/context/context-node'
import { Operation } from '../model/operation'
import { ActionCall, BeagleNode, ContextDeclaration } from './types'

const asActionCall = (action: Action<any>): ActionCall => ({
  _beagleAction_: `${action.namespace}:${action.name}`,
  analytics: transformExpressionsAndActions(action.analytics),
  ...transformExpressionsAndActions(action.properties),
})

const asActionCalls = (actions: Action<any> | Action<any>[]): ActionCall[] => (
  Array.isArray(actions) ? actions.map(asActionCall) : [asActionCall(actions)]
)

const asContextDeclaration = (context: AnyRootContext<any>): ContextDeclaration => ({
  id: context.toString(),
  value: context.value,
})

const transformExpressionsAndActions = (value: any): any => {
  const isActions = value instanceof Action || Array.isArray(value) && value[0] instanceof Action
  if (isActions) return asActionCalls(value)
  if (value instanceof Component) return asBeagleNode(value)
  if (value instanceof ContextNode || value instanceof Operation) return value.toString()
  if (Array.isArray(value)) return value.map(transformExpressionsAndActions)
  if (value && typeof value === 'object') return mapValues(value, transformExpressionsAndActions)
  return value
}

export const asBeagleNode = (component: Component): BeagleNode => {
  const childrenArray = Array.isArray(component.children) || !component.children
    ? component.children
    : [component.children]

  return {
    _beagleComponent_: `${component.namespace ?? genericNamespace}:${component.name}`,
    context: component.context ? asContextDeclaration(component.context) : undefined,
    id: component.id,
    ...transformExpressionsAndActions(component.properties ?? {}),
    children: isEmpty(childrenArray) ? undefined : childrenArray!.map(asBeagleNode),
  }
}

export const serialize = (componentTree: Component): string => JSON.stringify(asBeagleNode(componentTree))
