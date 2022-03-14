export interface NewProjectOptions {
  /**
  * Base path that will be the root of the API.
  * eg. If your path is beagle, then the root of your API will be: https://localhost:{port}/beagle/
  */
  basePath: string,
  /**
   * Port where the service will run.
   */
  port: string,
}

export interface ProjectFile {
  name: string,
  action: (content: string, projectName: string, options: NewProjectOptions) => string,
}
