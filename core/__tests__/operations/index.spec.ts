import { mapValues } from 'lodash'
import * as operations from 'src/operations'

describe('Operations module', () => {
  it('should export', () => expect(mapValues(operations, v => typeof v)).toMatchSnapshot())
})
