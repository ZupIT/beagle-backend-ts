import { mapValues } from 'lodash'
import * as components from 'src'

describe('Components module', () => {
  it('should export', () => expect(mapValues(components, v => typeof v)).toMatchSnapshot())
})
