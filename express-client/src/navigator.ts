import { FC } from '@zup-it/beagle-backend-core'
import {
  pushView, pushStack, popToView, popView, popStack, resetApplication, resetStack, Route,
} from '@zup-it/beagle-backend-core/actions'
import { forEach, isEmpty, map } from 'lodash'
import {
  ControllerId, PopStackAction, PopToViewAction, PopViewAction, PushStackAction,
  PushViewAction, ResetApplicationAction, ResetStackAction,
} from './model/navigation'
import { RouteMap, RouteConfig } from './route'
import { ScreenNavigation } from './screen'

const navigationActions = { pushView, pushStack, popToView, popView, resetApplication, resetStack, popStack }

interface GenericRemoteNavigation {
  type: keyof typeof navigationActions,
  screen?: FC<any>,
  properties?: ScreenNavigation<any, any> & ControllerId,
}

/**
 * See the property `navigation` in the interface `ScreenProps` for a detailed description of the Navigator.
 *
 * The instance of the current navigator is injected by the BeagleApplication for every registered Screen.
 *
 * @example
 * ```tsx
 * const MyScreen: Screen<Type> = ({ navigator }) => {
 *   // ...
 * }
 * ```
 */
export class Navigator {
  /**
   * @param routeMap the same routeMap received by BeagleApplication.
   * @param basePath the same basePath received by BeagleApplication options.
   */
  constructor(routeMap: RouteMap) {
    this.screenMap = new Map()
    forEach(routeMap, (value, key) => this.screenMap.set(
      typeof value === 'function' ? value : value.screen,
      { path: key, method: typeof value === 'function' ? undefined : value.method },
    ))
  }

  private screenMap: Map<FC<any>, RouteConfig>

  private getPathAndMethod(screen: FC<any>) {
    if (!this.screenMap.has(screen)) {
      throw new Error(
        "Couldn't find any route corresponding to the provided screen. Are you sure you registered it in the route map provided to the BeagleApp?",
      )
    }
    return this.screenMap.get(screen)!
  }

  private buildUrl(path: string, routeParams: Record<string, string> = {}, query?: Record<string, string>) {
    const withRouteParams = path.replace(
      /:(\w+)/g,
      (_, name) => name in routeParams ? encodeURIComponent(routeParams[name]) : `:${name}`,
    )
    const queryParts = map(query, (value, key) => `${key}=${encodeURIComponent(value)}`)
    return isEmpty(queryParts) ? withRouteParams : `${withRouteParams}?${queryParts.join('&')}`
  }

  private buildRoute({ type, screen, properties = {} }: GenericRemoteNavigation) {
    if (type === 'popView' || type === 'popStack') return undefined

    const { routeParams, headers, body, shouldPrefetch, fallback, query } = properties
    const { path, method } = this.getPathAndMethod(screen!)
    const url = this.buildUrl(path, routeParams, query)
    if (type === 'popToView') return url

    const httpAdditionalData = method || headers || body ? { method, headers, body } : undefined

    return {
      url,
      httpAdditionalData,
      shouldPrefetch,
      fallback,
    } as Route
  }

  private navigateRemote(navigation: GenericRemoteNavigation) {
    return navigationActions[navigation.type]({
      // @ts-ignore todo: check this later
      route: this.buildRoute(navigation),
      // @ts-ignore the type of the analytics is not right considering we can use the operator ".", e.g. "route.url"
      analytics: navigation.properties?.analytics,
      navigationContext: navigation.properties?.navigationContext,
      controllerId: navigation.properties?.controllerId,
    })
  }

  pushStack: PushStackAction = (...[screen, properties]) =>
    this.navigateRemote({ type: 'pushStack', screen, properties })

  popStack: PopStackAction = (properties) => this.navigateRemote({ type: 'popStack', properties })

  pushView: PushViewAction = (...[screen, properties]) => this.navigateRemote({ type: 'pushView', screen, properties })

  popView: PopViewAction = (properties) => this.navigateRemote({ type: 'popView', properties })

  popToView: PopToViewAction = (...[screen, properties]) =>
    this.navigateRemote({ type: 'popToView', screen, properties })

  resetStack: ResetStackAction = (...[screen, properties]) =>
    this.navigateRemote({ type: 'resetStack', screen, properties })

  resetApplication: ResetApplicationAction = (...[screen, properties]) => (
    this.navigateRemote({ type: 'resetApplication', screen, properties })
  )
}
