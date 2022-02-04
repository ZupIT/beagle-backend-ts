import { Response } from 'express'
import { listProducts } from '../services/product'

export async function listProductsController(response: Response) {
  await new Promise(resolve => setTimeout(resolve, 300))
  response.status(200).send(listProducts())
}
