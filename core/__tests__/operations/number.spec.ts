import { createContextNode, Operation } from 'src'
import { divide, gt, gte, lt, lte, multiply, subtract, sum } from 'src/operations/number'

describe('Operations: number', () => {
  it('should create operation "divide"', () => {
    const numberCtx = createContextNode<number>('ctx')
    const op: Operation<number> = divide(numberCtx, 5, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('divide')
    expect(op.args).toEqual([numberCtx, 5, 10])
  })

  it('should create operation "gt"', () => {
    const numberCtx = createContextNode<number>('ctx')
    const op: Operation<boolean> = gt(numberCtx, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('gt')
    expect(op.args).toEqual([numberCtx, 10])
  })

  it('should create operation "gte"', () => {
    const numberCtx = createContextNode<number>('ctx')
    const op: Operation<boolean> = gte(numberCtx, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('gte')
    expect(op.args).toEqual([numberCtx, 10])
  })

  it('should create operation "lt"', () => {
    const numberCtx = createContextNode<number>('ctx')
    const op: Operation<boolean> = lt(numberCtx, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('lt')
    expect(op.args).toEqual([numberCtx, 10])
  })

  it('should create operation "lte"', () => {
    const numberCtx = createContextNode<number>('ctx')
    const op: Operation<boolean> = lte(numberCtx, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('lte')
    expect(op.args).toEqual([numberCtx, 10])
  })

  it('should create operation "multiply"', () => {
    const numberCtx = createContextNode<number>('ctx')
    const op: Operation<number> = multiply(numberCtx, 5, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('multiply')
    expect(op.args).toEqual([numberCtx, 5, 10])
  })

  it('should create operation "subtract"', () => {
    const numberCtx = createContextNode<number>('ctx')
    const op: Operation<number> = subtract(numberCtx, 5, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('subtract')
    expect(op.args).toEqual([numberCtx, 5, 10])
  })

  it('should create operation "sum"', () => {
    const numberCtx = createContextNode<number>('ctx')
    const op: Operation<number> = sum(numberCtx, 5, 10)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('sum')
    expect(op.args).toEqual([numberCtx, 5, 10])
  })
})
