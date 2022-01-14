import { ContextNode, Expression, HttpMethod } from '..'
import { ActionInterface } from '../model/action'
import { Component } from '../model/component'
import { Operation } from '../model/operation'
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
interface IdentifiableComponent extends Component {
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
  url: Expression<string>,
  shouldPrefetch?: boolean,
  fallback?: Component,
  httpAdditionalData?: HttpAdditionalData,
}

export type Route = LocalView | RemoteView

interface BaseNavigationParams {
  // fixme: this should include both the path and the value
  navigationContext?: any,
}

interface RouteNavigationParams<T extends (Route | string) = Route> extends BaseNavigationParams {
  route: T,
}

interface StackNavigationParams extends RouteNavigationParams {
  controllerId?: string,
}

const navigator = {
  pushStack: createCoreAction<StackNavigationParams>('pushStack'),
  pushView: createCoreAction<RouteNavigationParams>('pushView'),
  popView: createCoreAction<BaseNavigationParams>('popView'),
  popToView: createCoreAction<RouteNavigationParams<string>>('popToView'),
  resetStack: createCoreAction<StackNavigationParams>('resetStack'),
  resetApplication: createCoreAction<StackNavigationParams>('resetApplication'),
}

interface PushViewFunction {
  (url: Expression<string>): ActionInterface,
  (...args: Parameters<typeof navigator.pushView>): ReturnType<typeof navigator.pushView>,
}

interface PushStackFunction {
  (url: Expression<string>): ActionInterface,
  (...args: Parameters<typeof navigator.pushStack>): ReturnType<typeof navigator.pushStack>,
}

interface PopToViewFunction {
  (url: Expression<string>): ActionInterface,
  (...args: Parameters<typeof navigator.popToView>): ReturnType<typeof navigator.popToView>,
}

interface ResetStackFunction {
  (url: Expression<string>): ActionInterface,
  (...args: Parameters<typeof navigator.resetStack>): ReturnType<typeof navigator.resetStack>,
}

interface PopViewFunction {
  (): ActionInterface,
  (...args: Parameters<typeof navigator.popView>): ReturnType<typeof navigator.popView>,
}

interface ResetApplicationFunction {
  (url: Expression<string>): ActionInterface,
  (...args: Parameters<typeof navigator.resetApplication>): ReturnType<typeof navigator.resetApplication>,
}

function getParams(options: any, isPopToView = false) {
  return (typeof options === 'string' || options instanceof ContextNode || options instanceof Operation)
    ? { route: isPopToView ? options : { url: options } }
    : options
}

export const pushView: PushViewFunction = (options: any) => navigator.pushView(getParams(options))
export const pushStack: PushStackFunction = (options: any) => navigator.pushStack(getParams(options))
export const resetStack: ResetStackFunction = (options: any) => navigator.resetStack(getParams(options))
export const resetApplication: ResetApplicationFunction = (options: any) => (
  navigator.resetApplication(getParams(options))
)
export const popToView: PopToViewFunction = (options: any) => navigator.popToView(getParams(options, true))
export const popView: PopViewFunction = (...args: any[]) => navigator.popView(args[0] ?? {})
