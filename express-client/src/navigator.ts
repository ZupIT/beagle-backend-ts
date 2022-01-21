import { FC } from '@zup-it/beagle-backend-core'
import {
  pushView, pushStack, popToView, popView, resetApplication, resetStack, Route,
} from '@zup-it/beagle-backend-core/actions'
import { forEach } from 'lodash'
import { RouteMap, RouteConfig } from './route'
import { ScreenRequest, Screen, ScreenNavigation } from './screen'

const navigationActions = { pushView, pushStack, popToView, popView, resetApplication, resetStack }

interface ControllerId {
  controllerId?: string,
}

interface GenericRemoteNavigation {
  type: keyof typeof navigationActions,
  screen?: FC<any>,
  properties?: ScreenNavigation<any> & ControllerId,
}

/**
 * See the property `navigation` in the interface `ScreenProps` for a detailed description of the Navigator.
 *
 * The instance of the current navigator is injected by the BeagleApplication for every registered Screen. See the
 * example below:
 *
 * ```
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
  constructor(routeMap: RouteMap, private basePath = '') {
    this.screenMap = new Map()
    forEach(routeMap, (value, key) => this.screenMap.set(
      typeof value === 'function' ? value : value.screen,
      { path: key, method: typeof value === 'function' ? undefined : value.method },
    ))
  }

  private screenMap: Map<FC<any>, RouteConfig>

  private getPathAndMethod(screen: FC<any>) {
    if (!this.screenMap.has(screen)) {
      throw new Error(`Couldn't find any route corresponding to "${screen}". Are you sure you registered it via BeagleApp.addScreen?`)
    }
    return this.screenMap.get(screen)!
  }

  private buildUrl(path: string, routeParams: Record<string, string> = {}) {
    return path.replace(/:(\w+)/g, (_, name) => name in routeParams ? routeParams[name] : `:${name}`)
  }

  private buildRoute({ type, screen, properties = {} }: GenericRemoteNavigation) {
    if (type === 'popView') return undefined

    const { routeParams, headers, body, shouldPrefetch, fallback } = properties
    const { path, method } = this.getPathAndMethod(screen!)
    const url = this.buildUrl(`${this.basePath}${path}`, routeParams)
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

  /**
   * Adds a new stack to the navigator with the provided route.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation (and analytics).
   * @returns an instance of Action.
   */
  pushStack = <T extends ScreenRequest>(screen: Screen<T>, properties?: ScreenNavigation<T> & ControllerId) => (
    this.navigateRemote({ type: 'pushStack', screen, properties })
  )

  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation (and analytics).
   * @returns an instance of Action.
   */
  pushView = <T extends ScreenRequest>(screen: Screen<T>, properties?: ScreenNavigation<T>) => (
    this.navigateRemote({ type: 'pushView', screen, properties })
  )

  /**
   * Goes back to the previous route.
   *
   * @param properties the navigation context to set and analytics.
   * @returns an instance of Action.
   */
  popView = <T extends ScreenRequest>(properties?: Pick<ScreenNavigation<T>, 'navigationContext' | 'analytics'>) => (
    this.navigateRemote({ type: 'popView', properties })
  )

  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param screen the screen (functional component) to go back to.
   * @param properties the data to send with this navigation (and analytics).
   * @returns an instance of Action.
   */
  popToView = <T extends ScreenRequest>(
    screen: Screen<T>,
    properties?: Pick<ScreenNavigation<T>, 'navigationContext' | 'analytics'>,
  ) => this.navigateRemote({ type: 'popToView', screen, properties })

  /**
   * Removes the current navigation stack and adds a new one with the provided route.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation (and analytics).
   * @returns an instance of Action.
   */
  resetStack = <T extends ScreenRequest>(screen: Screen<T>, properties?: ScreenNavigation<T> & ControllerId) => (
    this.navigateRemote({ type: 'resetStack', screen, properties })
  )

  /**
   * Removes all the navigation stacks and adds a new one with the provided route.
   *
   * @param screen the screen (functional component) to navigate to.
   * @param properties the data to send with this navigation (and analytics).
   * @returns an instance of Action.
   */
  resetApplication = <T extends ScreenRequest>(screen: Screen<T>, properties?: ScreenNavigation<T> & ControllerId) => (
    this.navigateRemote({ type: 'resetApplication', screen, properties })
  )
}
