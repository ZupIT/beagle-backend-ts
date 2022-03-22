import { isWeb, isMobile } from 'src/utils/headers'
import { BeagleHeaders } from 'src/utils/types'

describe('Utils: headers', () => {
  const webHeaders: BeagleHeaders = { 'beagle-platform': 'WEB' }
  const mobileHeaders: BeagleHeaders = { 'beagle-platform': 'MOBILE' }

  it('should be a web platform', () => {
    expect(isWeb(webHeaders)).toBe(true)
  })

  it('should not be a web platform', () => {
    expect(isWeb({})).toBe(false)
    expect(isWeb(mobileHeaders)).toBe(false)
  })

  it('should be a mobile platform', () => {
    expect(isMobile(mobileHeaders)).toBe(true)
  })

  it('should not be a mobile platform', () => {
    expect(isMobile({})).toBe(false)
    expect(isMobile(webHeaders)).toBe(false)
  })
})


