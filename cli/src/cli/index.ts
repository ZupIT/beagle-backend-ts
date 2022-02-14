#!/usr/bin/env node
import clear from 'clear'
import figlet from 'figlet'
import commander from 'commander'
import { logger } from './utils'

const cli = (async () => {
  clear()
  logger.info(figlet.textSync('beagle-ts', { horizontalLayout: 'fitted' }))

  const program = new commander.Command()
  program
    .name('beagle-ts')
    .description('A command-line interface that enhance the usage of Beagle Backend TypeScript, through helpers and shortcuts.')
    .usage('[global options] command')
    .version('1.0.0')

  program
    .command('new')
    .description('Create a new Beagle Backend TypeScript project.')
    .argument('<string>', 'name of the project. eg. "name-of-my-project" (will be the name of the folder)')
    .action(() => {})

  program
    .command('new-page')
    .alias('np')
    .description('Generates a new Page under Screens folder.')
    .argument('<string>', 'name of the screen that will be generated. eg. "name-of-my-screen"')
    .action(() => {})

  await program.parseAsync(process.argv)
})()

// eslint-disable-next-line import/no-default-export
export default cli
