import { spawn } from 'child_process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { startWS, reloadConnectedDevices } from './websocket'

interface Arguments {
  'hr-disabled': boolean,
  'hr-port': number,
}

const argv = yargs(hideBin(process.argv)).argv as unknown as Arguments

if (!argv['hr-disabled']) {
  startWS(argv['hr-port'] ?? 3001)
}

const tsNodeDev = spawn(
  'ts-node-dev',
  ['--transpile-only', 'src/index.ts'],
  { env: { ...process.env, HOT_RELOADING: 'true' } },
)

tsNodeDev.stdout.on('data', (data) => {
  const text = String.fromCharCode.apply(null, data)
  if (text.startsWith('__[HOT RELOADING: SERVER_STARTED]__') && !argv['hr-disabled']) {
    reloadConnectedDevices()
  }
  else process.stdout.write(data)
})

tsNodeDev.stderr.pipe(process.stderr)
