import { forEach } from 'lodash'
import { Express } from 'express'
import { serialize, FC, ContextNode, AnyContextNode } from '@zup-it/beagle-backend-core'
import { RouteConfig, RouteMap } from './types'

interface Options {
  responseHeaders?: Record<string, string>,
  basePath?: string,
}

export class BeagleApp<GlobalContextType = any> {
  constructor(private express: Express, routes: RouteMap, options: Options = {}) {
    this.responseHeaders = options.responseHeaders ?? {}
    this.basePath = options.basePath ?? ''
    this.addRouteMap(routes)
  }

  private responseHeaders: Record<string, any>
  private basePath: string
  // The casting below shouldn't be necessary. I don't know why TS complains.
  private globalContext = new ContextNode('globalContext') as unknown as AnyContextNode<GlobalContextType>

  private addRoute = (screen: FC<any>, properties: RouteConfig) => {
    const { method = 'get', path } = properties
    this.express[method](`${this.basePath}${path}`, (req, res) => {
      res.type('application/json')
      forEach(this.responseHeaders, (key, value) => res.setHeader(key, value))
      const componentTree = screen({
        request: req,
        response: res,
        navigationContext: new ContextNode('navigationContext'),
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
