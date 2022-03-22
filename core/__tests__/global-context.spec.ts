import { getGlobalContext } from 'src'
import { ContextNode } from 'src/model/context/context-node'

describe('Global Context', () => {
  it('should get global context', () => {
    interface MyAppContext {
      username: string,
    }
    const globaContext = getGlobalContext<MyAppContext>()
    expect(globaContext).toBeInstanceOf(ContextNode)
    expect(globaContext.path).toBe('global')
  })
})
