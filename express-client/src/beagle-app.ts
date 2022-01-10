import { forEach } from 'lodash'
import { Express } from 'express'
import { HttpMethod, serialize } from '@zup-it/beagle-backend-core'
import { ScreenClass } from './screen'

export class BeagleApp {
  constructor(private express: Express) {}

  protected responseHeaders: Record<string, any> = {}
  protected basePath = ''

  addScreen(method: HttpMethod, path: string, ScreenFactory: ScreenClass): void {
    const screen = new ScreenFactory()
    this.express[method](`${this.basePath}${path}`, (req, res) => {
      res.type('application/json')
      forEach(this.responseHeaders, (key, value) => res.setHeader(key, value))
      const componentTree = screen.build({
        body: req.body,
        headers: req.headers,
        query: req.query,
        request: req,
        response: res,
      })
      res.send(serialize(componentTree))
    })
  }
}
