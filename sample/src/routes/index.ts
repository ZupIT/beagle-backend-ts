import { Express } from 'express'
import { applyRoutes as applyOrderRoutes } from './order'
import { applyRoutes as applyProductRoutes } from './product'

export function applyRoutes(app: Express) {
  applyOrderRoutes(app)
  applyProductRoutes(app)
}
