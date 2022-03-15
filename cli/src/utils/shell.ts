import { exec, ExecOptions } from 'child_process'
import { logger } from '.'

export async function execShellCommand(command: string, options?: ExecOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (command) {
      const process = exec(command, options, (error, stdout, stderr) => {
        stdout && logger.info(stdout)
        stderr && logger.error(stderr)

        if (error) {
          reject(error)
        }
      })
      process.on('close', resolve)
    } else {
      reject(new Error('You should provide a valid shell command!'))
    }
  })
}
