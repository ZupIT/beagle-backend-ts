import { forEach } from 'lodash'
import { Express } from 'express'
import { serialize, createContextNode } from '@zup-it/beagle-backend-core'
import { RouteConfig, RouteMap } from './route'
import { Screen } from './screen'
import { Navigator } from './navigator'

interface Options {
  responseHeaders?: Record<string, string>,
  basePath?: string,
}

export class BeagleApp {
  constructor(private express: Express, routes: RouteMap, options: Options = {}) {
    this.responseHeaders = options.responseHeaders ?? {}
    this.basePath = options.basePath ?? ''
    this.addRouteMap(routes)
    this.navigator = new Navigator(routes)
  }

  private responseHeaders: Record<string, any>
  private basePath: string
  private navigationContext = createContextNode('navigationContext')
  private navigator: Navigator

  private addRoute = (screen: Screen, properties: RouteConfig) => {
    const { method = 'get', path } = properties
    this.express[method](`${this.basePath}${path}`, (req, res) => {
      res.type('application/json')
      forEach(this.responseHeaders, (key, value) => res.setHeader(key, value))
      const componentTree = screen({
        request: req,
        response: res,
        navigationContext: this.navigationContext,
        navigator: this.navigator,
      })
      res.send(serialize(componentTree))
    })
  }

  addRouteMap(routeMap: RouteMap) {
    forEach(routeMap, (value, key) => {
      if (typeof value === 'function') this.addRoute(value, { path: key })
      else this.addRoute(value.screen, { path: key })
    })
  }
}
