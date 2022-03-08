export * from './configs'
export * from './path'

export const getCamelCaseName = (screenName: string) => screenName
  .replace('-', ' ')
  .split(' ')
  .map(s => s[0].toUpperCase() + s.substring(1))
  .join('')
