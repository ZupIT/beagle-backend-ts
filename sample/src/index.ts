import express from 'express'
import cors from 'cors'
import { BeagleApp } from '@zup-it/beagle-backend-express'
import { routes } from './routes'

const port = 3000
const expressApp = express()

expressApp.use(cors())

expressApp.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

export const app = new BeagleApp(expressApp, routes)
