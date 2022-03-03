import { RouteMap } from '@zup-it/beagle-backend-express'
import { Home } from './home'
import { Welcome } from './welcome'

export const routes: RouteMap = {
  '/': Welcome,
  '/home': Home,
}
