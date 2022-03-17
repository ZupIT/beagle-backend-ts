import { RootContext, createContext } from 'src/model/context/root-context'
import { ContextNode, createContextNode } from 'src/model/context/context-node'
import { setContext } from 'src/actions/set-context'

jest.mock('src/actions/set-context')

describe('Context', () => {
  describe('ContextNode', () => {
    const context = new ContextNode('test.x[y]')

    it('should have a string representation', () => {
      expect(context.toString()).toBe('@{test.x[y]}')
    })

    it('should access child node via get (map)', () => {
      const child = context.get('key')
      expect(child).toBeInstanceOf(ContextNode)
      expect(child.path).toBe('test.x[y].key')
    })

    it('should access child node via at (array)', () => {
      const child = context.at(0)
      expect(child).toBeInstanceOf(ContextNode)
      expect(child.path).toBe('test.x[y][0]')
    })

    it('should set its own value via the action setContext', () => {
      const analytics = { additionalEntries: { test: 'test' } }
      context.set(10, analytics)
      expect(setContext).toHaveBeenCalledWith({
        contextId: 'test',
        path: 'x[y]',
        value: 10,
        analytics,
      })
    })

    it('should set root context', () => {
      const rootContext = new ContextNode('test')
      rootContext.set(10)
      expect(setContext).toHaveBeenCalledWith({
        contextId: 'test',
        path: '',
        value: 10,
      })
    })

    it('should throw error when setting context with invalid path', () => {
      const invalidContext = new ContextNode('-/*')
      expect(() => invalidContext.set(10)).toThrow()
    })
  })

  describe('createContext', () => {
    it('should create ContextNode', () => {
      const context = createContextNode<number>('test.a[2]')
      expect(context).toBeInstanceOf(ContextNode)
      expect(context.path).toBe('test.a[2]')
    })
  })

  describe('RootContext', () => {
    it('should create a RootContext', () => {
      const context = new RootContext('test', 'initialValue')
      expect(context).toBeInstanceOf(ContextNode)
      expect(context.path).toBe('test')
      expect(context.value).toBe('initialValue')
    })
  })

  describe('createContext', () => {
    it('should create a RootContext', () => {
      const context = createContext<string>('test', 'initialValue')
      expect(context).toBeInstanceOf(RootContext)
      expect(context.path).toBe('test')
      expect(context.value).toBe('initialValue')
    })
  })
})
