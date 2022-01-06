/*import { Component } from '../model/component'
import { Action } from '../model/action'
import { Context } from '../model/context/context'
import { ActionCall, ContextDeclaration } from './types'

const serializeAction = (action: Action<any>): ActionCall => ({
  _beagleAction_: `${action.namespace}:'${action.name}`,
  analytics: action.analytics,
  ...action.parameters,
})

const serializeActions = (actions: Action<any> | Action<any>[]): ActionCall[] => (
  Array.isArray(actions) ? actions.map(serializeAction) : [serializeAction(actions)]
)

function serializeContextDeclaration(context: Context<any>): ContextDeclaration {
  const { id } = context.getIdAndPath()
  return {
    id
  }
}

function serializeContextCall(context: Context<any>): string {

}

export function serialize(componentTree: Component<any>) {

}*/
