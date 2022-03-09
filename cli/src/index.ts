import clear from 'clear'
import commander from 'commander'
import { generateScreen, newProject } from './commands'

clear()

const program = new commander.Command()
program
  .name('beagle-ts')
  .description('A command-line interface that enhance the usage of Beagle Backend TypeScript, through helpers and shortcuts.')
  .usage('[global options] command')
  .version('1.0.0')

program
  .command('new')
  .description('Create a new Beagle Backend TypeScript project.')
  .argument('<project-name>', 'name of the project. eg. "name-of-my-project" (will be the name of the folder).')
  .option('-bp, --base-path <string>', 'Base path that will be the root of the API.', '')
  .option('-p, --port <number>', 'Port where the service will run.', '3000')
  .action(newProject)

program
  .command('generate-screen')
  .alias('gs')
  .description('Generates a new Screen under Screens folder.')
  .argument('<screen-name>', 'name of the screen that will be generated. eg. "name-of-my-screen".')
  .option('-wrp, --with-route-params', 'The screen will have parameters on the url.')
  .option('-wh, --with-headers', 'The screen will have headers to be sent in the request.')
  .option('-wb, --with-body', 'The screen will have a request body. Invalid for "GET" requests.')
  .option('-wq, --with-query', 'The screen will have properties in the urls query.')
  .option('-wnc, --with-navigation-context', 'The screen will have properties to be set in the navigation context.')
  .option('-wctx, --with-context', 'A Context that will be made available for this Screen and its children.')
  .option('-wc, --with-children', 'The children of this Screen.')
  .option('-wac, --with-accessibility', 'The Screen will support accessibility properties.')
  .option('-way, --with-analytics', 'The Screen will support analytics.')
  .option('-ws, --with-style', 'The style for this Screen. Use it to customize the background, layout, borders, etc.')

  .action(generateScreen)

program.parse(process.argv)
