import { Express } from 'express'
import { createOrderController, getOrderController } from '../controllers/order'

export function applyRoutes(app: Express) {
  app.post('/order', createOrderController)
  app.get('/order/:id', getOrderController)
}
