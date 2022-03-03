/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path'
import fsPromise from 'fs/promises'
import { cwd } from 'process'
import fse from 'fs-extra'
import { NewProjectOptions, ProjectFile } from './types'

const BOILERPLATE_PATH = path.resolve(__dirname, 'templates/boilerplate')
const PROJECT_NAME_PLACEHOLDER = 'beagle-ts-cli-project-name'
const PORT_PLACEHOLDER = 'beagle-ts-cli-port'

const projectFilesToChange: Array<ProjectFile> = [
  {
    name: 'LICENSE',
    action: (content: string, projectName: string, options: NewProjectOptions) =>
      content.replace(PROJECT_NAME_PLACEHOLDER, projectName),
  },
  {
    name: 'package.json',
    action: (content: string, projectName: string, options: NewProjectOptions) =>
      content.replace(PROJECT_NAME_PLACEHOLDER, projectName),
  },
  {
    name: 'README.md',
    action: (content: string, projectName: string, options: NewProjectOptions) =>
      content
        .replace(PROJECT_NAME_PLACEHOLDER, projectName)
        .replace(PORT_PLACEHOLDER, options.port),
  },
]

export const copyBoilerplateUpdatingFilesContent = async (newFolderName: string, options: NewProjectOptions) => {
  const boilerplateContent = await fsPromise.readdir(BOILERPLATE_PATH)
  const projectFolder = `${cwd()}/${newFolderName}`

  for (const dir of boilerplateContent) {
    await fse.copySync(`${BOILERPLATE_PATH}/${dir}`, `${projectFolder}/${dir}`)
  }

  for (const file of projectFilesToChange) {
    const path = `${projectFolder}/${file.name}`
    let fileContent = (await fsPromise.readFile(path)).toString('utf8')
    fileContent = file.action(fileContent, newFolderName, options)
    await fsPromise.writeFile(path, fileContent)
  }
}

export const createBeagleTsConfigFile = async (projectName: string, options: NewProjectOptions) => {
  const { port, basePath } = options
  const projectFolder = `${cwd()}/${projectName}`
  await fsPromise.writeFile(`${projectFolder}/beagle-ts.json`, JSON.stringify({ projectName, port, basePath }, null, 2))
}
