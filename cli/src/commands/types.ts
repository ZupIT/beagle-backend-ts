export type { GenerateScreenOptions } from './generate-screen/types'
export type { NewProjectOptions } from './new/types'

export interface BeagleTsConfig {
  projectName: string,
  port: number,
  basePath: string,
  screensFolderPath: string,
  routes: {
    filePath: string,
    varName: string,
  },
}
