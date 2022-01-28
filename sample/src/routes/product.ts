import { Express } from 'express';
import { listProductsController } from '../controllers/product'

export function applyRoutes(app: Express) {
  app.get('/products', (_, res) => listProductsController(res))
}
