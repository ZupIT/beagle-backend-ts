import { mapValues } from 'lodash'
import { colors } from 'src/color'

describe('Colors', () => {
  it('should have colors', () => expect(mapValues(colors, v => typeof v)).toMatchSnapshot())
})
