import { createContextNode, Operation } from 'src'
import { isEmpty, isNull, length } from 'src/operations/other'

describe('Operations: other', () => {
  it('should create operation "isEmpty"', () => {
    const ctx = createContextNode<string>('ctx')
    const op: Operation<boolean> = isEmpty(ctx)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('isEmpty')
    expect(op.args).toEqual([ctx])
  })

  it('should create operation "isNull"', () => {
    const ctx = createContextNode<string>('ctx')
    const op: Operation<boolean> = isNull(ctx)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('isNull')
    expect(op.args).toEqual([ctx])
  })

  it('should create operation "length"', () => {
    const ctx = createContextNode<string>('ctx')
    const op: Operation<number> = length(ctx)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('length')
    expect(op.args).toEqual([ctx])
  })
})
