import { HttpMethod } from '@zup-it/beagle-backend-core'
import { Screen } from './screen'

export interface RouteConfig {
  method?: HttpMethod,
  path: string,
}

export type RouteMap = Record<string, Screen | { method: HttpMethod, screen: Screen }>
