import { spawn } from 'child_process'
import { logger } from '../../utils'
import { pathExists } from '../utils'
import { StartOptions } from './types'
import { startWS, reloadConnectedDevices } from './websocket'

/**
 * String expected by the hot reloading service (cli: start) for identifying a server restart.
 *
 * @privateRemarks if you change this, don't forget to also change the variable of same name in the module "core".
 */
export const hotReloadingString = '__[HOT RELOADING: SERVER_STARTED]__'
const defaultEntrypoint = 'src/index.ts'

export async function startServer({ hotReloadingDisabled, hotReloadingPort, entrypoint }: StartOptions) {
  entrypoint ??= defaultEntrypoint
  const isEntrypointValid = await pathExists(entrypoint)
  if (!isEntrypointValid) {
    logger.error(
      `Could not find file "${entrypoint}". Aborting. Please make to sure to run this command at the root of a Beagle Backend TS project.`,
    )
    process.exit(1)
  }

  if (!hotReloadingDisabled) {
    startWS(hotReloadingPort ?? 3001)
  }

  const tsNodeDev = spawn(
    'ts-node-dev',
    ['--transpile-only', entrypoint],
    { env: { ...process.env, HOT_RELOADING: `${!hotReloadingDisabled}` } },
  )

  tsNodeDev.stdout.on('data', (data) => {
    const text = String.fromCharCode.apply(null, data)
    if (text.startsWith(hotReloadingString) && !hotReloadingDisabled) {
      reloadConnectedDevices()
    }
    else process.stdout.write(data)
  })

  tsNodeDev.stderr.pipe(process.stderr)
}
