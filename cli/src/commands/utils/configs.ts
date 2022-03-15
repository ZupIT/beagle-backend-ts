import { cwd } from 'process'
import fsPromise from 'fs/promises'
import { BeagleTsConfig } from '../types'

export const getProjectConfigsFile = async () =>
  JSON.parse((await fsPromise.readFile(`${cwd()}/beagle-ts.json`)).toString('utf8')) as BeagleTsConfig
