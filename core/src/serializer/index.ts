import { isEmpty, mapValues, reduce } from 'lodash'
import { genericNamespace } from '../constants'
import { Component } from '../model/component'
import { Action, AnalyticsConfig, AnalyticsAttributesMap } from '../model/action'
import { AnyRootContext } from '../model/context/types'
import { ContextNode } from '../model/context/context-node'
import { Operation } from '../model/operation'
import { componentValidation } from '..'
import { isDevelopmentMode } from '../utils'
import { ActionCall, BeagleNode, ContextDeclaration, SerializedAnalyticsConfig } from './types'

/**
 * Transforms the format:
 * ```typescript
 * {
 *   route: {
 *     url: true,
 *     headers: {
 *       'content-type': true,
 *       platform: true
 *     }
 *   }
 * }
 * ```
 *
 * into:
 * ```typescript
 * ['route.url', 'route.headers.content-type', 'route.headers.platform']
 * ```
 *
 * If `undefined` is passed, `undefined` is returned.
 *
 * @param attributes the attributes as a map.
 * @param prefix the current prefix for the recursion, starts with an empty string.
 * @returns the attributes in an array format.
 */
const extractPaths = (attributes?: AnalyticsAttributesMap<any>, prefix = ''): string[] | undefined => (
  attributes && typeof attributes === 'object' ? reduce(
    attributes,
    (paths, value, key) => value === true
      ? [...paths, `${prefix}${key}`]
      : [...paths, ...(extractPaths(value, `${prefix}${key}.`) ?? [])],
    [] as string[],
  ) : undefined
)

const asAnalyticsConfig = (analytics: AnalyticsConfig<any>): SerializedAnalyticsConfig => analytics ? ({
  additionalEntries: analytics.additionalEntries,
  attributes: analytics.attributes ? extractPaths(analytics.attributes) : undefined,
}) : false

const asActionCall = (action: Action<any>): ActionCall => ({
  _beagleAction_: `${action.namespace ?? genericNamespace}:${action.name}`,
  analytics: action.analytics === undefined ? undefined : asAnalyticsConfig(action.analytics),
  ...transformExpressionsAndActions(action.properties),
})

const asActionCalls = (actions: Action<any> | Action<any>[]): ActionCall[] => (
  Array.isArray(actions) ? actions.map(asActionCall) : [asActionCall(actions)]
)

const asContextDeclaration = (context: AnyRootContext<any>): ContextDeclaration => ({
  id: context.path,
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

const asBeagleNode = (component: Component): BeagleNode => {
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

/**
 * Transforms the entire Component tree into the JSON format expected by Beagle.
 *
 * - Components become `{ _beagleComponent_: 'namespace:name', ... }`.
 * - Actions become `{ _beagleAction_: 'namespace:name', ... }`.
 * - Context declarations become `{ ..., context: { id: 'contextPath', value: 'rootContextValue' } }`.
 * - References to contexts become: `"@{contextPath}"`.
 * - Operations become: `"@{operationName(arguments)}"`.
 *
 * Attention: when in development mode, this function will also validate the component tree. To stop running the
 * validations, set NODE_ENV to something different than 'development'. To add validations to your own components,
 * use `componentValidation.add`.
 *
 * The validations are run after the JSX elements are translated to JS and before each component is serialized.
 *
 * @param componentTree the component tree to serialize
 * @returns the JSON string
 */
export const serialize = (componentTree: Component): string => {
  if (isDevelopmentMode()) {
    componentValidation.run(componentTree)
  }
  return JSON.stringify(asBeagleNode(componentTree))
}
