import { BeagleHeaders } from './types'

/**
 * Verifies if the frontend is a web application.
 *
 * @example
 * ```tsx
 * const MyScreen: Screen = ({ request: { headers } }) => {
 *   const content = (
 *     <>
 *       <Text>This is the common content between all platforms</Text>
 *       <Button>Ok!</Button>
 *     </>
 *   )
 *
 *   return isWeb(headers) ? (
 *     <Container style={{ flexDirection: 'ROW' }}>
 *       <Image type="remote" url="https://imagebank/logo.png" style={ { marginRight: 10 } } />
 *       {content}
 *     </Container>
 *   ) : (
 *     <>
 *       <Image type="local" url="logo" style={ { marginBottom: 10 } } />
 *       {content}
 *     </>
 *   )
 * }
 * ```
 * Now, the screen will be different based on the platform that requested it.
 *
 * @param headers the headers received by the screen.
 * @returns true if it is a web application, false otherwise.
 */
export function isWeb(headers: BeagleHeaders): boolean {
  return headers['beagle-platform'] === 'WEB'
}

/**
 * Verifies if the frontend is a mobile application.
 *
 * @example
 * ```tsx
 * const MyScreen: Screen = ({ request: { headers } }) => {
 *   const content = (
 *     <>
 *       <Text>This is the common content between all platforms</Text>
 *       <Button>Ok!</Button>
 *     </>
 *   )
 *
 *   return isMobile(headers) ? (
 *     <>
 *       <Image type="local" url="logo" style={ { marginBottom: 10 } } />
 *       {content}
 *     </>
 *   ) : (
 *     <Container style={{ flexDirection: 'ROW' }}>
 *       <Image type="remote" url="https://imagebank/logo.png" style={ { marginRight: 10 } } />
 *       {content}
 *     </Container>
 *   )
 * }
 * ```
 * Now, the screen will be different based on the platform that requested it.
 *
 * @param headers the headers received by the screen.
 * @returns true if it is a mobile application, false otherwise.
 */
export function isMobile(headers: BeagleHeaders): boolean {
  return headers['beagle-platform'] === 'MOBILE'
}
