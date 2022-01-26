import { Request, Response } from 'express'
import { WithAnalytics, AnyContextNode, Component } from '@zup-it/beagle-backend-core'
import { Navigator } from './navigator'

export interface RequestWithCustomHeaders<RouteParams = any, Headers = any, Body = any, Query = any>
  extends Request<RouteParams, any, Body, Query> {
  /**
   * The request headers of the request.
   */
  headers: Request['headers'] & Headers,
}

/**
 * The types expected in this Screen's request.
 */
export interface ScreenRequest {
  /**
   * The request headers expected to be in the request.
   *
   * Example: if you expect a header called "session-token", this should be:
   * ```
   * { 'session-token': string }
   * ```
   */
  headers: Record<string, string>,
  /**
   * The parameters expected in the route.
   *
   * Example: if the route is "/user/:userId/books/:bookId", this should be:
   * ```
   * {
   *   userId: string,
   *   bookId: string,
   * }
   * ```
   */
  routeParams: Record<string, string>,
  /**
   * The query parameters expected in the route.
   *
   * Example: if the route is "/list?order=crescent&page=1&limit=10", this should be:
   * ```
   * {
   *   order: 'crescent' | 'decrescent',
   *   page: `${number}`,
   *   limit: `${number}`,
   * }
   * ```
   */
  query: Record<string, string>,
  /**
   * The type of the request body. If a JSON is expected, specify here the object interface.
   */
  body: any,
  /**
   * The type of the navigation context of this screen. If it's an order page and you expect to receive both the order
   * id and the address from the navigation context, this should be:
   * ```
   * {
   *   orderId: string,
   *   address: Address,
   * }
   * ```
   */
  navigationContext: any,
}

interface ScreenProps<T extends ScreenRequest> {
  /**
   * The navigation context of this screen.
   */
  navigationContext: AnyContextNode<T['navigationContext']>,
  /**
   * The request object from express.
   */
  request: RequestWithCustomHeaders<T['routeParams'], T['headers'], T['body'], T['query']>,
  /**
   * The response object from express.
   */
  response: Response,
  /**
   * The navigator makes it easier and safer to use navigation actions for remote routes. Its use is optional and, in
   * terms of functionality, is equivalent to the navigation actions of the core library.
   *
   * It is better to use the navigator because, instead of working with strings, that can be anything, it works with
   * the functional components directly and verifies if the route actually exists. If it doesn't, an error is thrown.
   * Moreover, it separates the string "url" into "routeParams" and "query", while also typing every property according to
   * the screen.
   *
   * Example: suppose a screen called `Order` that can receive:
   * 1. the order id through a route parameter;
   * 2. whether to show the complete order or just a summary via a query parameter;
   * 3. and a token via headers.
   *
   * Considering we typed it correctly using the type `Screen`, a navigation to it could be written like this:
   * ```
   * // using the navigator
   * navigator.pushView(Order, {
   *   routeParams: { orderId: '1' },
   *   query: { summary: 'true' },
   *   headers: { token: '_AEx45O' },
   * })
   *
   * // using pushView from the core actions
   * pushView({
   *   route: {
   *     url: '/order/1?summary=true',
   *     httpAdditionalData: {
   *       headers: { token: '_AEx45O' },
   *     },
   *   }
   * )
   * ```
   *
   * Using the navigator, we're going to have validation in single one of the fields, making sure the correct type of
   * data is passed and providing auto-completion. Besides, we don't need to know the url for "Order", we just use the
   * imported Screen itself.
   *
   * The second way of navigating works, but it allows a long list of mistakes.
   */
  navigator: Navigator,
}

/**
 * A functional component that will be registered as a screen. Its props will be injected by the BeagleApplication
 * and contain the request, response, navigation context and navigator.
 *
 * It is extremely important to type `T` in `Screen<T>`. `T` tells Typescript what to expect from this screen when
 * building it and when navigating to it, i.e. it tells the type of the headers, query, route parameters, body and
 * navigation context.
 */
export type Screen<T extends ScreenRequest = any> = (props: ScreenProps<T>) => JSX.Element

/**
 * Type of the navigation parameters in the Navigator.
 */
export interface ScreenNavigation<T extends ScreenRequest, Props> extends WithAnalytics<Props> {
  /**
   * The parameters for the url.
   *
   * Example: if the route is "/user/:userId/books/:bookId", this could be `{ userId: '1', bookId: '302' }`.
   */
  routeParams?: T['routeParams'],
  /**
   * The headers to send in the request.
   */
  headers?: T['headers'],
  /**
   * The request body. Invalid for "GET" requests.
   */
  body?: T['body'],
  /**
   * The properties in the url's query.
   *
   * Example: if you want the url to be "/list?page=1&limit=10", this should be `{ page: '1', limit: '10' }`.
   */
  query?: T['query'],
  /**
   * The properties to set in the navigation context of the next screen (previous, if this is a pop navigation).
   */
  navigationContext?: T['navigationContext'],
  /**
   * When set to true, this screen will be fetched by the frontend as soon as possible instead of waiting any event to
   * trigger. This makes the navigation faster because when it actually happens, the page will already have been loaded.
   * Use it carefully though, making useless requests is not good. You should use this when the user will most certainly
   * access this screen next.
   */
  shouldPrefetch?: boolean,
  /**
   * An UI to show if the request fails.
   */
  fallback?: Component,
}
