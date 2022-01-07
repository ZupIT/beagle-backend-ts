import { IncomingHttpHeaders } from 'http'
import { Request, Response } from 'express'
import { Component } from '@zup-it/beagle-backend-core'
import { NavigationContext } from './navigation-context'

interface BuildParams<Headers, Body, Query> {
  headers: Headers,
  body: Body,
  query: Query,
  request: Request<any, any, any>,
  response: Response,
}

export abstract class Screen<
  Headers extends Record<string, any> = Record<string, any>,
  Body = any,
  Query extends Record<string, any> = Record<string, any>,
  NavigationContextType = any,
> {
  protected readonly navigationContext = new NavigationContext<NavigationContextType>()

  abstract build(buildParams: BuildParams<Headers & IncomingHttpHeaders, Body, Query>): Component
}

export type ScreenClass = { new(): Screen }
