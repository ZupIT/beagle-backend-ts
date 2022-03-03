import { cwd, exit } from 'process'
import clear from 'clear'
import { execShellCommand, logger } from '../../utils'
import { folderNameIsValid, pathExists } from '../utils'
import { createFolder } from '../utils/path'
import { copyBoilerplateUpdatingFilesContent, createBeagleTsConfigFile } from './hierarchy'
import { NewProjectOptions } from './types'

export const newProject = async (projectName: string, options: NewProjectOptions) => {
  if (!folderNameIsValid(projectName)) {
    logger.error('The project name is not valid for a folder name!')
    exit(1)
  }
  if (await pathExists(projectName)) {
    logger.error('There is already a folder with the same name!')
    exit(2)
  }

  logger.info(`1 - Beagle: Preparing to create the project: "${projectName}"...`)
  await createFolder(projectName)
  logger.info('2 - Beagle: Creating new files...')
  await copyBoilerplateUpdatingFilesContent(projectName, options)
  logger.info('3 - Beagle: Creating configuration file...')
  await createBeagleTsConfigFile(projectName, options)
  logger.info('4 - Beagle: Installing dependencies...')
  await execShellCommand('npm install', { cwd: `${cwd()}/${projectName}` })

  clear()

  logger.success(`Beagle: All done! The project was created under the folder: "${projectName}".`)

  exit()
}
