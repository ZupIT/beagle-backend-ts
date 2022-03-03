import { cwd, exit } from 'process'
import fsPromise from 'fs/promises'
import clear from 'clear'
import { logger } from '../../utils'
import { folderNameIsValid, pathExists } from '../utils'
import { generateScreenCodeFromBoilerplate } from './screen'
import { GenerateScreenOptions } from './types'

export const generateScreen = async (screenName: string, options: GenerateScreenOptions) => {
  logger.info(`1 - Beagle: Preparing to generate screen: "${screenName}"...`)

  if (!folderNameIsValid(screenName)) {
    logger.error(`The screen name, "${screenName}",is not valid!`)
    exit(1)
  }

  logger.info('2 - Beagle: Validating paths...')

  const pathsToValidate = ['src/beagle/screens', 'beagle/screens', 'screens']
  let screenFilePath = `${screenName}.tsx`
  for (const folder of pathsToValidate) {
    const screenPath = `${cwd()}/${folder}/${screenFilePath}`
    if (await pathExists(screenPath)) {
      logger.error(`The screen "${screenFilePath}" already exists on the path: "${screenPath}"`)
      exit(2)
    }

    const exists = await pathExists(folder)
    if (exists) {
      screenFilePath = screenPath
      break
    }
  }

  try {
    logger.info('3 - Beagle: Generating screen code from boilerplate...')
    const generatedScreenCode = await generateScreenCodeFromBoilerplate(screenName, options)
    logger.info('4 - Beagle: Writing screen file...')
    await fsPromise.writeFile(screenFilePath, generatedScreenCode)
  } catch (error) {
    logger.error(error)
    exit(500)
  }

  logger.info('5 - Beagle: File created...')
  clear()
  logger.success(`Beagle: Screen created on: "${screenFilePath}"`)
  exit()
}
