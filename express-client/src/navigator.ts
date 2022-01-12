import { HttpMethod, FC } from '@zup-it/beagle-backend-core'
import {
  pushView, pushStack, popToView, popView, resetApplication, resetStack, Route,
} from '@zup-it/beagle-backend-core/actions/index'
import { LocalScreenNavigation, Screen, ScreenNavigation } from './screen'

interface RouteConfig {
  method?: HttpMethod,
  path: string,
}

const navigationActions = { pushView, pushStack, popToView, popView, resetApplication, resetStack }

interface ControllerId {
  controllerId?: string,
}

interface GenericRemoteNavigation {
  type: keyof typeof navigationActions,
  screen?: FC<any>,
  properties?: ScreenNavigation<any> & ControllerId,
}

interface GenericLocalNavigation {
  type: Exclude<keyof typeof navigationActions, 'popView' | 'popToView'>,
  screen: FC<any>,
  properties?: Pick<ScreenNavigation<any>, 'analytics' | 'navigationContext'> & ControllerId,
}

export class Navigator {
  constructor(private basePath: string) {}

  private screenMap: Map<FC<any>, Omit<RouteConfig, 'screen'>> = new Map()

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

  private navigateLocal({ type, properties, screen }: GenericLocalNavigation) {
    return navigationActions[type]({
      // @ts-ignore todo: check this later
      route: { screen },
      // @ts-ignore the type of the analytics is not right considering we can use the operator ".", e.g. "route.url"
      analytics: properties?.analytics,
      navigationContext: properties?.navigationContext,
    })
  }

  register(screen: FC<any>, route: RouteConfig) {
    this.screenMap.set(screen, route)
  }

  remote = {
    pushStack: <T extends Screen>(screen: FC<T>, properties?: ScreenNavigation<T> & ControllerId) => (
      this.navigateRemote({ type: 'pushStack', screen, properties })
    ),
    pushView: <T extends Screen>(screen: FC<T>, properties?: ScreenNavigation<T>) => (
      this.navigateRemote({ type: 'pushView', screen, properties })
    ),
    popView: (navigationContext?: any) => (
      this.navigateRemote({ type: 'popView', properties: { navigationContext } })
    ),
    popToView: <T extends Screen>(screen: FC<T>, navigationContext?: ScreenNavigation<T>['navigationContext']) => (
      this.navigateRemote({ type: 'popToView', screen, properties: { navigationContext } })
    ),
    resetStack: <T extends Screen>(screen: FC<T>, properties?: ScreenNavigation<T> & ControllerId) => (
      this.navigateRemote({ type: 'resetStack', screen, properties })
    ),
    resetApplication: <T extends Screen>(screen: FC<T>, properties?: ScreenNavigation<T> & ControllerId) => (
      this.navigateRemote({ type: 'resetApplication', screen, properties })
    ),
  }

  local = {
    pushStack: <T extends Screen>(screen: FC<T>, properties?: LocalScreenNavigation<T> & ControllerId) => (
      this.navigateLocal({ type: 'pushStack', screen, properties })
    ),
    pushView: <T extends Screen>(screen: FC<T>, properties?: LocalScreenNavigation<T>) => (
      this.navigateLocal({ type: 'pushView', screen, properties })
    ),
    popView: this.remote.popView,
    popToView: this.remote.popToView,
    resetStack: <T extends Screen>(screen: FC<T>, properties?: LocalScreenNavigation<T> & ControllerId) => (
      this.navigateLocal({ type: 'resetStack', screen, properties })
    ),
    resetApplication: <T extends Screen>(screen: FC<T>, properties?: LocalScreenNavigation<T> & ControllerId) => (
      this.navigateLocal({ type: 'resetApplication', screen, properties })
    ),
  }
}
