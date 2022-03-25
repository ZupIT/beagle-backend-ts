import { mapValues } from 'lodash'
import * as express from 'src'

describe('Express module', () => {
  it('should export', () => expect(mapValues(express, v => typeof v)).toMatchSnapshot())
})
