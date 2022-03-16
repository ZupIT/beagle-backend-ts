import clear from 'clear'
import commander from 'commander'
import { generateScreen, newProject, startServer } from './commands'

clear()

const program = new commander.Command()
program
  .name('beagle-ts')
  .description('A command-line tool that helps using Beagle Backend TypeScript by initializing a project and creating new files from templates.')
  .usage('[global options] command')
  .version('1.0.0')

program
  .command('new')
  .description('Creates a new Beagle Backend TypeScript project.')
  .argument('<project-name>', 'name of the project. eg. "name-of-my-project" (will be the name of the folder).')
  .option('-bp, --base-path <string>', 'Base path that will be the root of the API.', '')
  .option('-p, --port <number>', 'Port where the service will run.', '3000')
  .action(newProject)

program
  .command('generate-screen')
  .alias('gs')
  .description('Generates a new Screen under /screens.')
  .argument('<screen-name>', 'name of the screen that will be generated. eg. "name-of-my-screen".')
  .option('-wrp, --with-route-params', 'The screen will have parameters on the url.')
  .option('-wh, --with-headers', 'The screen will expect headers in the request.')
  .option('-wb, --with-body', 'The screen will expect the request to have a body. Invalid for "GET" requests.')
  .option('-wq, --with-query', 'The screen will expect query parameters in the url.')
  .option('-wnc, --with-navigation-context', 'The screen will expect a navigation context.')
  .option('-wctx, --with-context', 'A Context that will be made available for this Screen and its children.')
  .action(generateScreen)

program
  .command('start')
  .description('Starts the project and watches for file changes. It also starts a hot-reloading websocket server for front-ends to connect to.')
  .option('-hrd, --hot-reloading-disabled', 'Disables the hot reloading websocket server.')
  .option('-hrp, --hot-reloading-port', 'Changes the port for the hot reloading websocket server (3001 by default).')
  .option('-e, --entrypoint', 'Changes the application entrypoint ("src/index.ts" by default).')
  .action(startServer)

program.parse(process.argv)
