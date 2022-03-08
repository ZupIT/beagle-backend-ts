import { cwd, exit } from 'process'
import fsPromise from 'fs/promises'
import { logger } from '../../utils'
import { folderNameIsValid, getProjectConfigsFile, pathExists } from '../utils'
import { generateScreenCodeFromBoilerplate, updateRouteFile } from './screen'
import { GenerateScreenOptions } from './types'

export const generateScreen = async (screenName: string, options: GenerateScreenOptions) => {
  logger.info('Beagle TypeScript CLI: Generate Screen:')
  logger.info(`- Preparing to generate screen: "${screenName}"...`)

  if (!folderNameIsValid(screenName)) {
    logger.error(`The screen name, "${screenName}",is not valid!`)
    exit(1)
  }

  logger.info('- Validating configuration file...')
  const configFileExists = await pathExists(`${cwd()}/beagle-ts.json`)
  if (!configFileExists) {
    logger.error('This is not a Beagle Backend TypeScript Project! (Configuration file "beagle-ts.json" not found!)')
    exit(1)
  }

  const configs = await getProjectConfigsFile()
  const pathToCreate = `${configs.screensFolderPath}/${screenName}.tsx`

  try {
    logger.info('- Generating screen code from boilerplate...')
    const generatedScreenCode = await generateScreenCodeFromBoilerplate(screenName, options)
    logger.info('- Writing screen file...')
    await fsPromise.writeFile(pathToCreate, generatedScreenCode)
    logger.info('- Updating routes...')
    await updateRouteFile(screenName, pathToCreate, configs)
  } catch (error) {
    logger.error(error)
    exit(500)
  }

  logger.success(`Screen created under this location: "${pathToCreate}"`)
  exit()
}
