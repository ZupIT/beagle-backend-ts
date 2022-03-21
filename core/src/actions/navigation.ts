import { Expression, HttpMethod } from '../types'
import { Action } from '../model/action'
import { Component } from '../model/component'
import { isDynamicExpression } from '../utils'
import { createCoreAction } from './core-action'

// App navigation

export interface OpenNativeRouteParams {
  /**
   * The identifier of the route in mobile applications or the relative URL in web apps.
   */
  route: Expression<string>,
  /**
   * Removes all the navigation history if set to true.
   *
   * Attention: this feature doesn't play well with Web Apps and Flutter.
   */
  shouldResetApplication?: boolean,
  /**
   * A Map containing all the data needed by the route. It will become query parameters in web applications. It doesn't
   * do anything in Flutter applications.
   *
   * Warning: Beagle iOS and Beagle Android won't accept expression values in this map. While working with these
   * platforms, you should interpret this type as `Record<string, string>`.
   */
  data?: Record<string, Expression<string>>,
}

/**
 * Navigates to a local native route.
 *
 * @category Actions
 * @param params the action parameters: route, shouldResetApplication and data. See {@link OpenNativeRouteParams}.
 */
export const openNativeRoute = createCoreAction<OpenNativeRouteParams>('openNativeRoute')

export interface OpenExternalUrlParams {
  /**
   * The URL of the web page.
   */
  url: Expression<string>,
}

const openExternalUrlAction = createCoreAction<OpenExternalUrlParams>('openExternalUrl')

interface OpenExternalUrl {
  /**
   * Opens the browser with the provided URL.
   *
   * @param url the url to the web page to open.
   */
  (url: OpenExternalUrlParams['url']): ReturnType<typeof openExternalUrlAction>,
  /**
   * Opens the browser with the provided URL.
   *
   * @param properties an object with the URL to navigate to and analytics.
   */
  (properties: Parameters<typeof openExternalUrlAction>[0]): ReturnType<typeof openExternalUrlAction>,
}

/** @category Actions */
export const openExternalUrl: OpenExternalUrl = (urlOrOptions) => (
  typeof urlOrOptions === 'string' || isDynamicExpression(urlOrOptions)
    ? openExternalUrlAction({ url: urlOrOptions as Expression<string> })
    : openExternalUrlAction(urlOrOptions as OpenExternalUrlParams)
)

// Beagle Navigation

/**
 * Transforms anything into the navigation context expected by the frontend, i.e. an object with `path` and `value`.
 * `path` will be undefined if it's not possible to extract a common path from the argument `data`.
 *
 * Example: `{ user: { address: { position: { lat: 58.8, lng: -136.5 } } }` becomes
 * `{ path: 'user.address.position', value: { lat: 58.8, lng: -136.5 } }`.
 *
 * @param data the data to transform into a navigation context
 * @returns the navigation context
 */
function formatNavigationContext(data: any) {
  if (!data) return
  const keyParts: string[] = []

  while (data && !isDynamicExpression(data) && typeof data === 'object' && Object.keys(data).length === 1) {
    const currentKey = Object.keys(data)[0]
    keyParts.push(currentKey)
    data = data[currentKey]
  }

  return {
    path: keyParts.length ? keyParts.join('.') : undefined,
    value: data,
  }
}

export interface LocalView {
  /**
   * The component tree of this route. The root of this tree tree must have an id.
   */
  screen: Component,
}

export interface HttpAdditionalData {
  /**
   * The HTTP method to use when fetching the screen.
   *
   * @defaultValue `'get'`
   */
  method?: HttpMethod,
  /**
   * The headers to send with the request.
   */
  headers?: Record<string, string>,
  /**
   * The body to send with the request. Invalid for GET requests.
   */
  body?: any,
}

export interface RemoteView {
  /**
   * The URL of the screen to fetch.
   */
  url: Expression<string>,
  /**
   * When set to true, the front-end application will load this as soon as possible instead of waiting the navigation
   * action to be triggered.
   */
  shouldPrefetch?: boolean,
  /**
   * Component tree to show if the screen can't be fetched.
   */
  fallback?: Component,
  /**
   * Further customization for the request.
   */
  httpAdditionalData?: HttpAdditionalData,
}

export type Route = LocalView | RemoteView

export interface BaseNavigationParams {
  /**
   * The navigation context to set in this navigation. Each route (screen) can have a navigation-scoped context and
   * this is the way to set it. For instance, once we click in a "Buy now" button, we may want to send the user to
   * "/product", but "/product" might need to know which product we're talking about, one way to pass this information
   * is via the navigation context.
   *
   * Another use-case for this feature is when we want to return to a page with a new information. For example, when
   * finishing an order, we might need to ask the user for his/her address. After obtaining the address, we can send
   * the user back to the "finish-order" screen (popView) and send the address in the navigation context.
   *
   * By default, nothing is sent here.
   */
  navigationContext?: unknown,
}

export interface RouteNavigationParams<T extends (Route | string) = Route> extends BaseNavigationParams {
  /**
   * The route to navigate to. It can be either a remote view, fetched from the backend, or a local view, which is
   * just a new component tree. When it's local, the root of the tree must have an id, this will be used as the name
   * of the route in the local navigator.
   */
  route: T,
}

interface StackNavigationParams extends RouteNavigationParams {
  /**
   * Used to set the navigation controller for this stack. The navigation controller is an entity implemented in the
   * front-end that allows you to control the loading, error and success behavior when a navigation is triggered.
   *
   * Each navigation controller in the front-end is identified by a string. You can specify this string here so Beagle
   * can use this specific custom behavior for all navigations in this stack.
   */
  controllerId?: string,
}

export type PushStackParams = StackNavigationParams
export type PushViewParams = RouteNavigationParams
export type PopViewParams = BaseNavigationParams
export type PopToViewParams = RouteNavigationParams<string>
export type ResetStackParams = StackNavigationParams
export type PopStackParams = BaseNavigationParams
export type ResetApplicationParams = StackNavigationParams

const navigator = {
  pushStack: createCoreAction<PushStackParams>('pushStack'),
  pushView: createCoreAction<PushViewParams>('pushView'),
  popView: createCoreAction<PopViewParams>('popView'),
  popToView: createCoreAction<PopToViewParams>('popToView'),
  popStack: createCoreAction<BaseNavigationParams>('popStack'),
  resetStack: createCoreAction<ResetStackParams>('resetStack'),
  resetApplication: createCoreAction<ResetApplicationParams>('resetApplication'),
}

type AnyFunction = (...args: any) => any
type NavigationFunctionParams<T, N extends AnyFunction, R> = T extends string ? R : Parameters<N>
type NavigationFunctionReturnType<T, N extends AnyFunction> = T extends string ? Action : ReturnType<N>

interface PushViewFunction {
  /**
   * Adds the provided route to the current navigation stack.
   *
   * @type {(url: Expression<string>) => Action}
   * @param url the url to the screen to load
   * @returns an instance of Action
   *
   * @type {(props: ActionProps<PushViewParams>) => Action}
   * @param props the parameters for  this navigation:
   * - route: the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  <T>(
    ...args: NavigationFunctionParams<T, typeof navigator.pushView, [url: Expression<T>]>
  ): NavigationFunctionReturnType<T, typeof navigator.pushView>,
}

interface PushStackFunction {
  /**
   * Adds a new stack to the navigator with the provided route.
   *
   * @type {(url: Expression<string>) => Action}
   * @param url the url to the screen to load
   * @returns an instance of Action
   *
   * @type {(props: ActionProps<PushStackParams>) => Action}
   * @param props the parameters for this navigation:
   * - route: the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - controllerId: the id for the navigation controller to use. See {@link StackNavigationParams}.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  <T>(
    ...args: NavigationFunctionParams<T, typeof navigator.pushStack, [url: Expression<T>]>
  ): NavigationFunctionReturnType<T, typeof navigator.pushStack>,
}

interface PopStackFunction {
  /**
   * Pops the current stack, going back to the last route of the previous stack.
   *
   * @type {() => Action}
   * @returns an instance of Action
   *
   * @type {(props: ActionProps<PopStackParams>) => Action}
   * @param props the parameters for this navigation:
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
   <T>(
    ...args: NavigationFunctionParams<T, typeof navigator.popStack, []>
  ): NavigationFunctionReturnType<T, typeof navigator.popStack>,
}

interface PopToViewFunction {
  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @type {(routeId: Expression<string>) => Action}
   * @param routeId the identifier of the route to go back to. For RemoteViews, this identifier will be the url. For
   * LocalViews, it will the id of the root component.
   * @returns an instance of Action
   *
   * @type {(props: ActionProps<PopToViewParams>) => Action}
   * @param props the parameters for this navigation:
   * - route: the identifier for the screen to go back to.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  <T>(
    ...args: NavigationFunctionParams<T, typeof navigator.popToView, [routeId: Expression<T>]>
  ): NavigationFunctionReturnType<T, typeof navigator.popToView>,
}

interface ResetStackFunction {
  /**
   * Removes the current navigation stack and adds a new one with the provided route.
   *
   * @type {(url: Expression<string>) => Action}
   * @param url the url to the screen to load
   * @returns an instance of Action
   *
   * @type {(props: ActionProps<ResetStackParams>) => Action}
   * @param props the parameters for this navigation:
   * - route: the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - controllerId: the id for the navigation controller to use. See {@link StackNavigationParams}.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  <T>(
    ...args: NavigationFunctionParams<T, typeof navigator.resetStack, [url: Expression<T>]>
  ): NavigationFunctionReturnType<T, typeof navigator.resetStack>,
}

interface PopViewFunction {
  /**
   * Goes back to the previous route.
   *
   * @type {() => Action}
   * @returns an instance of Action
   *
   * @type {(props: ActionProps<PopViewParams>) => Action}
   * @param props the parameters for this navigation:
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  <T>(
    ...args: NavigationFunctionParams<T, typeof navigator.popView, []>
  ): NavigationFunctionReturnType<T, typeof navigator.popView>,
}

interface ResetApplicationFunction {
  /**
   * Removes all the navigation stacks and adds a new one with the provided route.
   *
   * @type {(url: Expression<string>) => Action}
   * @param url the url to the screen to load
   * @returns an instance of Action
   *
   * @type {(props: ActionProps<ResetApplicationParams>) => Action}
   * @param props the parameters for this navigation:
   * - route: the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - controllerId: the id for the navigation controller to use. See {@link StackNavigationParams}.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  <T>(
    ...args: NavigationFunctionParams<T, typeof navigator.resetApplication, [url: Expression<T>]>
  ): NavigationFunctionReturnType<T, typeof navigator.resetApplication>,
}

function validateLocalNavigationScreen(screen: Component | (() => Component)): void {
  const component: Component = screen instanceof Component ? screen : screen()
  if (!component.id) {
    throw new Error(`The screen component must have an id, on the root component ("${component.namespace}:${component.name}"), to perform a local navigation.`)
  }
}

function validateLocalNavigationOptions(options: any) {
  if (!options.route) throw new Error('The "route" property is mandatory to perform a local navigation.')
  if (!options.route.screen) throw new Error('The "route.screen" property is mandatory to perform a local navigation.')
  if (options.route.screen instanceof Component || typeof options.route.screen === 'function') {
    validateLocalNavigationScreen(options.route.screen)
  }
  else throw new Error('The "route.screen" property must be a Component or a RemoteView.')
}

function getParams(options: any, isPopToView = false) {
  const isParamASingleUrl = typeof options === 'string' || isDynamicExpression(options)
  if (isParamASingleUrl) return { route: isPopToView ? options : { url: options } }
  const { navigationContext, ...other } = options
  validateLocalNavigationOptions(options)
  return { navigationContext: formatNavigationContext(navigationContext), ...other }
}

/** @category Actions */
export const pushView: PushViewFunction = (options) => navigator.pushView(getParams(options))
/** @category Actions */
export const pushStack: PushStackFunction = (options) => navigator.pushStack(getParams(options))
/** @category Actions */
export const resetStack: ResetStackFunction = (options) => navigator.resetStack(getParams(options))
/** @category Actions */
export const resetApplication: ResetApplicationFunction = (options) => (
  navigator.resetApplication(getParams(options))
)
/** @category Actions */
export const popToView: PopToViewFunction = (options) => navigator.popToView(getParams(options, true))
/** @category Actions */
export const popView: PopViewFunction = (options = {}) => navigator.popView(getParams(options))
/** @category Actions */
export const popStack: PopStackFunction = (options = {}) => navigator.popStack(getParams(options))
