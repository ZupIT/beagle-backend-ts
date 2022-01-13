import { Navigator, RouteMap } from '@zup-it/beagle-backend-express'
import { Home } from './home'
import { Order } from './order'
import { Profile } from './profile'
import { Test } from './test'
import { Welcome } from './welcome'

const routes: RouteMap = {
  '/home': Home,
  '/order': Order,
  '/profile': Profile,
  '/test': Test,
  '/welcome': Welcome,
}

export const navigator = new Navigator(routes)
