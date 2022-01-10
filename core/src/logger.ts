type Level = 'info' | 'warning' | 'error'

const logSource = 'Beagle'

class Logger {
  private log(level: Level, message: string) {
    // eslint-disable-next-line no-console
    console.log(`${logSource} (${level}): ${message}`)
  }

  info(message: string) {
    this.log('info', message)
  }

  warning(message: string) {
    this.log('warning', message)
  }

  error(message: string, exception?: any) {
    this.log('info', `${message}${exception ? `\n${exception}` : ''}`)
  }
}

export const logger = new Logger()
