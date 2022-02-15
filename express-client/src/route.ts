import { HttpMethod } from '@zup-it/beagle-backend-core'
import { Screen } from './screen'

interface WithMethod {
  /**
   * The HttpMethod for the route. Defaults to "GET".
   */
  method?: HttpMethod,
}

export interface RouteConfig extends WithMethod {
  /**
   * The path for the route. Any string acceptable by express routes can be used here.
   */
  path: string,
}

interface RouteMapValue extends WithMethod {
  /**
   * The functional component that creates the screen.
   */
  screen: Screen,
}

/**
 * A map of routes where the key is the route name and the value is any of these:
 *
 * 1. a functional component to create the screen;
 * 2. an object containing the HttpMethod for the route and functional component to create the screen.
 */
export type RouteMap = Record<string, Screen<any> | RouteMapValue>
