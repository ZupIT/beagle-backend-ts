import { mapValues } from 'lodash'
import * as actions from 'src/actions'

describe('Actions module', () => {
  it('should export', () => expect(mapValues(actions, v => typeof v)).toMatchSnapshot())
})
