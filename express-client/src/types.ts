import { HttpMethod, FC } from '@zup-it/beagle-backend-core'

export interface RouteConfig {
  method?: HttpMethod,
  path: string,
}

export type RouteMap = Record<string, FC<any> | { method: HttpMethod, screen: FC<any> }>
