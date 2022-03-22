import { createContextNode, Operation } from 'src'
import { contains, insert, remove, removeIndex, union } from 'src/operations/array'

describe('Operations: array', () => {
  const arrayContext = createContextNode<string[]>('ctx')

  it('should create operation "contains"', () => {
    const op: Operation<boolean> = contains(arrayContext, 'test')
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('contains')
    expect(op.args).toEqual([arrayContext, 'test'])
  })

  it('should create operation "insert"', () => {
    const element = createContextNode<string>('element')
    const op: Operation<string[]> = insert(arrayContext, element, 5)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('insert')
    expect(op.args).toEqual([arrayContext, element, 5])
  })

  it('should create operation "insert" without an index', () => {
    const element = createContextNode<string>('element')
    const op: Operation<string[]> = insert(arrayContext, element)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('insert')
    expect(op.args).toEqual([arrayContext, element])
  })

  it('should create operation "remove"', () => {
    const op: Operation<string[]> = remove(arrayContext, 'test')
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('remove')
    expect(op.args).toEqual([arrayContext, 'test'])
  })

  it('should create operation "removeIndex"', () => {
    const op: Operation<string[]> = removeIndex(arrayContext, 2)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('removeIndex')
    expect(op.args).toEqual([arrayContext, 2])
  })

  it('should create operation "removeIndex" without an index', () => {
    const op: Operation<string[]> = removeIndex(arrayContext)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('removeIndex')
    expect(op.args).toEqual([arrayContext])
  })

  it('should create operation "union"', () => {
    const arrayContext2 = createContextNode<string[]>('ctx2')
    const arrayContext3 = createContextNode<string[]>('ctx3')
    const op: Operation<string[]> = union(arrayContext, arrayContext2, arrayContext3)
    expect(op).toBeInstanceOf(Operation)
    expect(op.name).toBe('union')
    expect(op.args).toEqual([arrayContext, arrayContext2, arrayContext3])
  })
})
