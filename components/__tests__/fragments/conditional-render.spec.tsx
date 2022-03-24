import { BeagleJSX, coreNamespace, createContextNode, serialize } from '@zup-it/beagle-backend-core'
import { condition } from '@zup-it/beagle-backend-core/operations'
import { If, Then, Else } from 'src/fragments/conditional-render'
import { Style } from 'src/style/simple-styles'

describe('Conditional render', () => {
  const shouldRender = createContextNode<boolean>('ctx')

  it('should render If', () => {
    const component = (
      <If condition={shouldRender}>
        <Then>
          <component name="test" />
        </Then>
      </If>
    )
    expect(component).toEqual(
      <component name="test" properties={{ style: { display: condition(shouldRender, 'FLEX', 'NONE') } }} />
    )
  })

  it('should render If-Else', () => {
    const component = (
      <If condition={shouldRender}>
        <Then>
          <component name="test-then" />
        </Then>
        <Else>
          <component name="test-else" />
        </Else>
      </If>
    )
    expect(component).toEqual(
      <component name="container" namespace={coreNamespace} properties={{}}>
        <component name="test-then" properties={{ style: { display: condition(shouldRender, 'FLEX', 'NONE') } }} />
        <component name="test-else" properties={{ style: { display: condition(shouldRender, 'NONE', 'FLEX') } }} />
      </component>
    )
  })

  it("should throw if If doesn't have a Then as a child", () => {
    const createComponent = () => (
      <If condition={shouldRender}>
        <Else>
          <component name="test-else" />
        </Else>
      </If>
    )
    expect(createComponent).toThrow()
  })

  it('should throw if If have children other than Then or Else', () => {
    const createComponent = () => (
      <If condition={shouldRender}>
        <Then>
          <component name="test-then" />
        </Then>
        <component name="test" />
      </If>
    )
    expect(createComponent).toThrow()
  })

  it('When serializing in development mode: should throw if Then is child of something other than If', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    const component = (
      <component name="test">
        <Then>
          <component name="test-then" />
        </Then>
      </component>
    )
    expect(() => serialize(component)).toThrow()
    process.env.NODE_ENV = env
  })

  it('When serializing in development mode: should throw if Else is child of something other than If', () => {
    const env = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    const component = (
      <component name="test">
        <Else>
          <component name="test-then" />
        </Else>
      </component>
    )
    expect(() => serialize(component)).toThrow()
    process.env.NODE_ENV = env
  })

  it('should transfer id and styles', () => {
    const style: Style = { backgroundColor: '#FFF' }
    const component = (
      <If condition={shouldRender} id="test" style={style}>
        <Then>
          <component name="test-then" />
        </Then>
        <Else>
          <component name="test-else" />
        </Else>
      </If>
    )
    expect(component).toEqual(
      <component name="container" namespace={coreNamespace} id="test" properties={{ style }}>
        <component name="test-then" properties={{ style: { display: condition(shouldRender, 'FLEX', 'NONE') } }} />
        <component name="test-else" properties={{ style: { display: condition(shouldRender, 'NONE', 'FLEX') } }} />
      </component>
    )
  })
})
