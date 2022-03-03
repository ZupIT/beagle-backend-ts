import path from 'path'
import fsPromise from 'fs/promises'
import { GenerateScreenOptions } from './types'

export const generateScreenCodeFromBoilerplate = async (screenName: string, options: GenerateScreenOptions) => {
  const formattedScreenName = screenName
    .replace('-', ' ')
    .split(' ')
    .map(s => s[0].toUpperCase() + s.substring(1))
    .join('')

  const screenProps = {
    ...(options.withRouteParams ? { routeParams: { your: 'routeParams' } } : {}),
    ...(options.withHeaders ? { headers: { your: 'headers' } } : {}),
    ...(options.withBody ? { body: { your: 'body' } } : {}),
    ...(options.withQuery ? { query: { your: 'query' } } : {}),
    ...(options.withNavigationContext ? { navigationContext: { your: 'navigationContext' } } : {}),
  }

  const screenHasProps = Object.keys(screenProps).length > 0
  const screenPropsName = `${formattedScreenName}Props`
  const expressionsToReplace = [
    {
      expression: '// [generated-screen-import-screen]',
      newText: screenHasProps ? 'import { Screen } from \'@zup-it/beagle-backend-express\'' : '',
    },
    {
      expression: '// [generated-screen-props]',
      newText: screenHasProps ? `\r\ninterface ${screenPropsName} ${JSON.stringify(screenProps, null, 2)}\r\n` : '',
    },
    {
      expression: 'GeneratedScreenName',
      newText: `${formattedScreenName}${screenHasProps ? `: Screen<${screenPropsName}>` : ''}`,
    },
    {
      expression: '[formatted-screen-name]',
      newText: formattedScreenName,
    },
  ]

  let screenBoilerplateContent = (await fsPromise.readFile(
    path.resolve(__dirname, 'templates/screen/index.tsx')
  )).toString('utf8')

  screenBoilerplateContent = expressionsToReplace.reduce((content, current) => (
    content = content.replaceAll(current.expression, current.newText)
  ), screenBoilerplateContent)

  return screenBoilerplateContent
}
