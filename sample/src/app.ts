import express from 'express'
import { BeagleApp } from '@zup-it/beagle-backend-express'
import { GlobalContext } from './global-context'

const port = 3000
const expressApp = express()

expressApp.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

export const app = new BeagleApp<GlobalContext>(expressApp)
