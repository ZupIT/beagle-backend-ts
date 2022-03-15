import express from 'express'
import cors from 'cors'
import { BeagleApp } from '@zup-it/beagle-backend-express'
import { routes as beagleRoutes } from './beagle/screens'
import { applyRoutes } from './routes'
import { setupHotReloading } from '@zup-it/beagle-backend-core'

const port = 3000
export const expressApp = express()

expressApp.use(cors()).use(express.json())

export const expressListener = expressApp.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
  setupHotReloading()
})

applyRoutes(expressApp)
new BeagleApp(expressApp, beagleRoutes, { basePath: '/beagle' })
