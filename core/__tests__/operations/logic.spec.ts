import { createContextNode, Operation } from 'src'
import { and, condition, not, or } from 'src/operations/logic'

describe('Operations: logic', () => {
  it('should create operation "and"', () => {
    const boolCtx = createContextNode<boolean>('ctx')
    const op = and(true, false, boolCtx)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('and')
    expect(op.args).toEqual([true, false, boolCtx])
  })

  it('should create operation "condition"', () => {
    const boolCtx = createContextNode<boolean>('ctx')
    const op = condition(boolCtx, 'str', 5)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('condition')
    expect(op.args).toEqual([boolCtx, 'str', 5])
  })

  it('should create operation "condition"', () => {
    const boolCtx = createContextNode<boolean>('ctx')
    const op = not(boolCtx)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('not')
    expect(op.args).toEqual([boolCtx])
  })

  it('should create operation "or"', () => {
    const boolCtx = createContextNode<boolean>('ctx')
    const op = or(true, false, boolCtx)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('or')
    expect(op.args).toEqual([true, false, boolCtx])
  })
})
