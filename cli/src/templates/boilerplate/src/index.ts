
import express from 'express'
import cors from 'cors'
import { BeagleApp } from '@zup-it/beagle-backend-express'
import { setupHotReloading } from '@zup-it/beagle-backend-core'
import configs from '../beagle-ts.json'
import { routes as beagleRoutes } from './screens'

const expressApp = express()
expressApp.use(cors()).use(express.json())
expressApp.listen(configs.port, () => {
  console.log(`App listening at http://localhost:${configs.port}`)
  setupHotReloading()
})

new BeagleApp(expressApp, beagleRoutes, { basePath: configs.basePath })
