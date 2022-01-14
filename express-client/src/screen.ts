import { Request, Response } from 'express'
import { WithAnalytics, AnyContextNode, Component } from '@zup-it/beagle-backend-core'
import { Navigator } from './navigator'

export interface RequestWithCustomHeaders<RouteParams = any, Headers = any, Body = any, Query = any>
  extends Request<RouteParams, any, Body, Query> {
  headers: Request['headers'] & Headers,
}

export interface ScreenRequest {
  headers: Record<string, string>,
  routeParams: Record<string, string>,
  query: Record<string, string>,
  body: any,
  navigationContext: any,
}

interface ScreenProps<T extends ScreenRequest> {
  navigationContext: AnyContextNode<T['navigationContext']>,
  request: RequestWithCustomHeaders<T['routeParams'], T['headers'], T['body'], T['query']>,
  response: Response,
  navigator: Navigator,
}

export type Screen<T extends ScreenRequest = any> = (props: ScreenProps<T>) => JSX.Element

export interface ScreenNavigation<T extends ScreenRequest> extends WithAnalytics {
  routeParams?: T['routeParams'],
  headers?: T['headers'],
  body?: T['body'],
  query?: T['query'],
  navigationContext?: T['navigationContext'],
  shouldPrefetch?: boolean,
  fallback?: Component,
}
