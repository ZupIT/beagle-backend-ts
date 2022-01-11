import { forEach } from 'lodash'
import { Express } from 'express'
import { HttpMethod, serialize, FC, ContextNode, AnyContextNode } from '@zup-it/beagle-backend-core'
import { Screen } from './screen'
import { Navigator } from './navigator'

interface Options {
  responseHeaders?: Record<string, string>,
  basePath?: string,
}

interface ScreenProperties {
  method?: HttpMethod,
  path: string,
  screen: FC<Screen>,
}

export class BeagleApp<GlobalContextType = any> {
  constructor(private express: Express, options: Options = {}) {
    this.responseHeaders = options.responseHeaders ?? {}
    this.basePath = options.basePath ?? ''
    this.navigator = new Navigator(this.basePath)
  }

  private responseHeaders: Record<string, any>
  private basePath: string
  // The casting below shouldn't be necessary. I don't know why TS complains.
  readonly globalContext = new ContextNode('globalContext') as unknown as AnyContextNode<GlobalContextType>
  readonly navigator: Navigator

  addScreen(properties: ScreenProperties): void {
    const { method = 'get', path, screen } = properties
    this.navigator.register(properties.screen, properties)
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
}
