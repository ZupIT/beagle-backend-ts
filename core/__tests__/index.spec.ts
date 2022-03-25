import { mapValues } from 'lodash'
import * as core from 'src'

describe('Core module', () => {
  it('should export', () => expect(mapValues(core, v => typeof v)).toMatchSnapshot())
})
