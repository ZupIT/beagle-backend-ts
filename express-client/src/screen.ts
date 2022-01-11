import { Request, Response } from 'express'
import { Analytics, AnyContextNode } from '@zup-it/beagle-backend-core'
import { Component } from '@zup-it/beagle-backend-core'

export interface RequestWithCustomHeaders<RouteParams = any, Headers = any, Body = any, Query = any>
  extends Request<RouteParams, any, Body, Query> {
  headers: Request['headers'] & Headers,
}

export type Dictionary<T> = {
  [K in keyof T]: string
}

export interface Screen<
  RouteParams extends Dictionary<RouteParams> = any,
  Headers extends Dictionary<Headers> = any,
  Body = any,
  Query extends Dictionary<Query> = any,
  NavigationContextType = any,
> {
  navigationContext: AnyContextNode<NavigationContextType>,
  request: RequestWithCustomHeaders<RouteParams, Headers, Body, Query>,
  response: Response,
  context: never,
  id: never,
}

export interface LocalScreenNavigation<T extends Screen> extends Analytics {
  navigationContext?: T extends Screen<any, any, any, any, infer R> ? R : never,
}

export interface ScreenNavigation<T extends Screen> extends LocalScreenNavigation<T> {
  routeParams?: T extends Screen<infer R> ? R : never,
  headers?: T extends Screen<any, infer R> ? R : never,
  body?: T extends Screen<any, any, infer R> ? R : never,
  query?: T extends Screen<any, any, any, infer R> ? R : never,
  shouldPrefetch?: boolean,
  fallback?: Component,
}
