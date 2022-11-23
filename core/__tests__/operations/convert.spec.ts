import { Operation } from 'src'
import { int, double, string } from 'src/operations/convert'

describe('Operations: convert', () => {
  it('should create operation "int"', () => {
    const op: Operation<number> = int(6.692)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('int')
    expect(op.args).toEqual([6.692])
  })

  it('should create operation "double"', () => {
    const op: Operation<number> = double('3.45')
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('double')
    expect(op.args).toEqual(['3.45'])
  })

  it('should create operation "string"', () => {
    const op: Operation<string> = string(4.56)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('string')
    expect(op.args).toEqual([4.56])
  })
})
