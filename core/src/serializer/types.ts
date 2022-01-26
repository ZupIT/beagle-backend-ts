import { AnalyticsConfig } from '../model/action'

/**
 * A Context declaration as expected by the Beagle frontend libraries.
 */
export interface ContextDeclaration {
  id: string,
  value?: any,
}

/**
 * A call to an Action as expected by the Beagle frontend libraries.
 */
export interface ActionCall {
  _beagleAction_: `${string}:${string}`,
  analytics?: AnalyticsConfig<any>,
  [key: string]: any,
}

/**
 * A component as expected by the Beagle frontend libraries.
 */
export interface BeagleNode {
  _beagleComponent_: `${string}:${string}`,
  id?: string,
  context?: ContextDeclaration,
  children?: BeagleNode[],
  [key: string]: any,
}


export type SerializedAnalyticsConfig = false | {
  additionalEntries?: Record<string, any>,
  attributes?: string[],
}
