import fs from 'fs/promises'
import { cwd } from 'process'

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

export const getBeagleTsConfig = async (): Promise<BeagleTsConfig> => {
  try {
    return JSON.parse(
      (await fs.readFile(`${cwd()}/beagle-ts.json`)
    ).toString('utf8')) as BeagleTsConfig
  } catch (error) {
    console.error(error)
    return {
      projectName: '',
      port: 3000,
      basePath: 'beagle',
      screensFolderPath: 'src/beagle/screens',
      routes: {
        filePath: 'src/beagle/screens/index.ts',
        varName: 'routes',
      },
    }
  }
}
