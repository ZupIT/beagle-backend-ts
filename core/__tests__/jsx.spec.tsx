import { BeagleJSX, RootContext, Component, WithChildren, setFragmentFactory } from 'src'
import { beagleFragmentFactory } from 'src/jsx/fragment'
import { omitUndefined } from './utils'

describe('JSX', () => {
  describe('General JSX tests', () => {
    it('should create component', () => {
      const component = (
        <component name="comp" namespace="test" context={new RootContext('ctx')} id="01" properties={{ prop: 1 }} />
      )
      expect(component).toBeInstanceOf(Component)
      expect(component).toEqual({
        name: 'comp',
        namespace: 'test',
        context: new RootContext('ctx'),
        id: '01',
        properties: { prop: 1 },
      })
    })

    it('should create component with one child', () => {
      const component = (
        <component name="comp">
          <component name="another" />
        </component>
      )
      expect(component).toEqual({
        name: 'comp',
        children: {
          name: 'another',
        },
      })
    })

    it('should create component with multiple children', () => {
      const component = (
        <component name="comp">
          <component name="another" />
          <component name="another" />
        </component>
      )
      expect(component).toEqual({
        name: 'comp',
        children: [
          { name: 'another' },
          { name: 'another' },
        ],
      })
    })

    it('should throw error when an invalid intrinsic component is used', () => {
      // @ts-ignore
      expect(() => <blah />).toThrow()
    })

    it('should use functional component', () => {
      interface MyFCProps extends WithChildren {
        prop1: string,
        prop2: number,
      }

      const MyFC = ({ prop1, prop2, children }: MyFCProps) => (
        <component name="test" properties={{ prop1, prop2 }}>
          {children}
        </component>
      )

      const myFC = <MyFC prop1="hello" prop2={5}><component name="child" /></MyFC>
      expect(myFC).toBeInstanceOf(Component)
      expect(myFC).toEqual({
        name: 'test',
        properties: { prop1: 'hello', prop2: 5 },
        children: { name: 'child' },
      })
    })

    it('should use string as functional component child', () => {
      interface TextProps {
        children: string,
      }

      const Text = ({ children }: TextProps) => (
        <component name="text" properties={{ value: children }} />
      )

      const text = <Text>hello world!</Text>
      expect(text).toEqual({
        name: 'text',
        properties: { value: 'hello world!' },
      })
    })

    it('should use function as functional component child', () => {
      interface MyFCProps {
        children: () => Component,
      }

      const MyFC = ({ children }: MyFCProps) => (
        <component name="test" properties={{ fallback: children() }} />
      )

      const text = <MyFC>{() => <component name="child" />}</MyFC>
      expect(omitUndefined(text)).toEqual({
        name: 'test',
        properties: { fallback: { name: 'child' } },
      })
    })
  })

  describe('Fragments', () => {
    it('should create a Text component if the child is a string', () => {
      const component = <>Hello World!</>
      expect(component).toBeInstanceOf(Component)
      expect(component).toEqual({
        name: 'text',
        namespace: 'beagle',
        properties: { text: 'Hello World!' },
      })
    })

    it('should combine multiple types in a single Text component', () => {
      const component = <>Hello {5} World {true} {[1, 2]} {{ test: 'hi' }}!</>
      expect(component).toBeInstanceOf(Component)
      expect(component).toEqual({
        name: 'text',
        namespace: 'beagle',
        properties: { text: 'Hello 5 World true [1,2] {"test":"hi"}!' },
      })
    })

    it('should create Container if the children is more than one component', () => {
      const component = <><component name="test1" /><component name="test2" /></>
      expect(component).toBeInstanceOf(Component)
      expect(omitUndefined(component)).toEqual({
        name: 'container',
        namespace: 'beagle',
        children: [{ name: 'test1' }, { name: 'test2' }],
      })
    })

    it('should create Container and Text components for mixed types of children', () => {
      const component = (
        <>
          <component name="test1" />
          Text 1
          Text 2
          <component name="test2" />
          {true}
          {5}
          {4}
          3
          Text 3
        </>
      )
      expect(omitUndefined(component)).toEqual({
        name: 'container',
        namespace: 'beagle',
        children: [
          { name: 'test1' },
          { name: 'text', namespace: 'beagle', properties: { text: 'Text 1 Text 2' } },
          { name: 'test2' },
          { name: 'text', namespace: 'beagle', properties: { text: 'true543 Text 3' } },
        ],
      })
    })

    it('should replace Fragment behavior', () => {
      setFragmentFactory(children => new Component({ name: 'my-fragment', children }))
      const component = <><component name="test" /></>
      expect(component).toBeInstanceOf(Component)
      expect(component).toEqual({
        name: 'my-fragment',
        children: { name: 'test' },
      })
      setFragmentFactory(beagleFragmentFactory)
    })
  })
})
