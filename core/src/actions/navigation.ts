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
 * Example: `{ user: { address: { position: { lat: 58.8, lng: -136.5 } } } }` becomes
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

interface PushViewFunction {
  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param url the url to the screen to load
   * @returns an instance of Action
   */
  (url: Expression<string>): Action,

  /**
   * Adds the provided route to the current navigation stack.
   *
   * @param props the parameters for this navigation:
   * - route the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.pushView>): ReturnType<typeof navigator.pushView>,
}

interface PushStackFunction {
  /**
   * Adds a new stack to the navigator with the provided route.
   *
   * @param url the url to the screen to load
   * @returns an instance of Action
   */
   (url: Expression<string>): Action,

  /**
   * Adds a new stack to the navigator with the provided route.
   *
   * @param props the parameters for this navigation:
   * - route: the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - controllerId: the id for the navigation controller to use. See {@link StackNavigationParams}.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.pushStack>): ReturnType<typeof navigator.pushStack>,
}

interface PopStackFunction {
  /**
   * Pops the current stack, going back to the last route of the previous stack.
   *
   * @returns an instance of Action
   *
   */
  (): Action,

  /**
   * Pops the current stack, going back to the last route of the previous stack.
   *
   * @param props the parameters for this navigation:
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.popStack>): ReturnType<typeof navigator.popStack>,
}

interface PopToViewFunction {
  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param routeId the identifier of the route to go back to. For RemoteViews, this identifier
   * will be the url. For LocalViews, it will the id of the root component.
   * @returns an instance of Action
   */
   (routeId: Expression<string>): Action,

  /**
   * Goes back to the route identified by the string passed as parameter. If the route doesn't exist in the current
   * navigation stack, nothing happens.
   *
   * @param props the parameters for this navigation:
   * - route: the identifier for the screen to go back to.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.popToView>): ReturnType<typeof navigator.popToView>,
}

interface ResetStackFunction {
  /**
   * Removes the current navigation stack and adds a new one with the provided route.
   *
   * @param url the url to the screen to load
   * @returns an instance of Action
   */
  (url: Expression<string>): Action,

  /**
   * Removes the current navigation stack and adds a new one with the provided route.
   *
   * @param props the parameters for this navigation:
   * - route: the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - controllerId: the id for the navigation controller to use. See {@link StackNavigationParams}.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.resetStack>): ReturnType<typeof navigator.resetStack>,
}

interface PopViewFunction {
  /**
  * Goes back to the previous route.
  *
  * @returns an instance of Action
  * */
  (): Action,

  /**
   * Goes back to the previous route.
   *
   * @param props the parameters for this navigation:
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.popView>): ReturnType<typeof navigator.popView>,
}

interface ResetApplicationFunction {
  /**
   * Removes all the navigation stacks and adds a new one with the provided route.
   *
   * @param url the url to the screen to load
   * @returns an instance of Action
   */
   (url: Expression<string>): Action,

  /**
   * Removes all the navigation stacks and adds a new one with the provided route.
   *
   * @param props the parameters for this navigation:
   * - route: the screen to load. A {@link LocalView} or a {@link RemoteView}.
   * - controllerId: the id for the navigation controller to use. See {@link StackNavigationParams}.
   * - navigationContext: the Context for this navigation. See {@link BaseNavigationParams}.
   * @returns an instance of Action
   */
  (...args: Parameters<typeof navigator.resetApplication>): ReturnType<typeof navigator.resetApplication>,
}

function getParams(props: any, isPopToView?: boolean) {
  const isParamASingleUrl = typeof props === 'string' || isDynamicExpression(props)
  if (isParamASingleUrl) return { route: isPopToView ? props : { url: props } }
  if (props?.route?.screen && !props.route.screen.id) {
    throw new Error(`
      The screen component must have an id, to perform a local navigation.
      Root component: "${props?.route?.screen?.namespace ?? 'namespace'}:${props?.route?.screen?.name ?? 'name'}".
    `)
  }
  const { navigationContext, ...other } = props
  return { navigationContext: formatNavigationContext(navigationContext), ...other }
}

/** @category Actions */
export const pushView: PushViewFunction = (props) => navigator.pushView(getParams(props))
/** @category Actions */
export const pushStack: PushStackFunction = (props) => navigator.pushStack(getParams(props))
/** @category Actions */
export const resetStack: ResetStackFunction = (props) => navigator.resetStack(getParams(props))
/** @category Actions */
export const resetApplication: ResetApplicationFunction = (props) => (navigator.resetApplication(getParams(props)))
/** @category Actions */
export const popToView: PopToViewFunction = (props) => navigator.popToView(getParams(props, true))
/** @category Actions */
export const popView: PopViewFunction = (props = {}) => navigator.popView(getParams(props))
/** @category Actions */
export const popStack: PopStackFunction = (props = {}) => navigator.popStack(getParams(props))
