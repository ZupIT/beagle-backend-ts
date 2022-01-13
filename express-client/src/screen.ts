import { Request, Response } from 'express'
import { Analytics, AnyContextNode, Component, FC } from '@zup-it/beagle-backend-core'

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
  globalContext: any,
}

interface ScreenProps<T extends ScreenRequest> {
  navigationContext: AnyContextNode<T['navigationContext']>,
  request: RequestWithCustomHeaders<T['routeParams'], T['headers'], T['body'], T['query']>,
  response: Response,
  context: never,
  id: never,
}

export type Screen<T extends ScreenRequest = any> = FC<ScreenProps<T>>

export interface ScreenNavigation<T extends ScreenRequest> extends Analytics {
  routeParams?: T['routeParams'],
  headers?: T['headers'],
  body?: T['body'],
  query?: T['query'],
  navigationContext?: T['navigationContext'],
  shouldPrefetch?: boolean,
  fallback?: Component,
}
