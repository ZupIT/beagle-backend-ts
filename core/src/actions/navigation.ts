import { HttpMethod } from '..'
import { ComponentInterface } from '../model/component'
import { createCoreAction } from './core-action'

// App navigation

interface OpenNativeRouteParams {
  route: string,
  shouldResetApplication?: boolean,
  data?: Record<string, string>,
}

export const openNativeRoute = createCoreAction<OpenNativeRouteParams>('openNativeRoute')

interface OpenExternalUrlParams {
  url: string,
}

export const openExternalUrl = createCoreAction<OpenExternalUrlParams>('openExternalUrl')

// Beagle Navigation

interface IdentifiableComponent extends ComponentInterface {
  id: string,
}

interface LocalView {
  screen: IdentifiableComponent,
}

interface HttpAdditionalData {
  method?: HttpMethod,
  headers?: Record<string, string>,
  body?: any,
}

interface RemoteView {
  url: string,
  shouldPrefetch?: boolean,
  fallback?: ComponentInterface,
  httpAdditionalData?: HttpAdditionalData,
}

export type Route = LocalView | RemoteView

interface BaseNavigationParams {
  navigationContext?: any,
}

interface RouteNavigationParams<T extends (Route | string) = Route> extends BaseNavigationParams {
  route: T,
}

interface StackNavigationParams extends RouteNavigationParams {
  controllerId?: string,
}

export const pushStack = createCoreAction<StackNavigationParams>('pushStack')
export const pushView = createCoreAction<RouteNavigationParams>('pushView')
export const popView = createCoreAction<BaseNavigationParams>('popView')
export const popToView = createCoreAction<RouteNavigationParams<string>>('popToView')
export const resetStack = createCoreAction<StackNavigationParams>('resetStack')
export const resetApplication = createCoreAction<StackNavigationParams>('resetApplication')
