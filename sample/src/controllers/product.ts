import { Response } from 'express'
import { listProducts } from '../services/product'

export function listProductsController(response: Response) {
  response.status(200).send(listProducts())
}
