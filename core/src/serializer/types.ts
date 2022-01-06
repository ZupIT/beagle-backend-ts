import { AnalyticsConfig } from '../model/action/types'

export interface ContextDeclaration {
  id: string,
  value?: any,
}

export interface ActionCall {
  _beagleAction_: `${string}:${string}`,
  analytics?: AnalyticsConfig<any>,
  [key: string]: any,
}

export interface BeagleNode {
  _beagleComponent_: `${string}:${string}`,
  id?: string,
  context?: ContextDeclaration,
  children?: BeagleNode[],
  [key: string]: any,
}
