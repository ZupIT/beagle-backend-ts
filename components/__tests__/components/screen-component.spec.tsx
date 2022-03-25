import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { NavigationBar, ScreenComponent, ScreenProps } from '../../src/components/screen-component'
import { Container } from '../../src/components/container'
import { Text } from '../../src/components/text'
import { Button } from '../../src/components/button'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Container', () => {
    const name = 'screencomponent'
    const id = 'test-screencomponent'
    const children = [<Text>This is the child test case.</Text>, <Button>Click me</Button>]
    const properties: Partial<ScreenProps> = {
      safeArea: undefined,
      navigationBar: undefined,
    }
    const options = { id, properties: { ...properties, child: <Container>{children}</Container> } }

    it('should create component with its children under the "child" property', () => {
      expectComponentToBeCorrect(<ScreenComponent id={id}>{children}</ScreenComponent>, name, options)
    })

    describe('Children', () => {
      it('should set the child as the Component passed, when children is a single child', () => {
        const singleChild = <Text>This is the child test case.</Text>
        expectComponentToBeCorrect(
          <ScreenComponent id={id}>{singleChild}</ScreenComponent>,
          name,
          { ...options, properties: { ...options.properties, child: singleChild } },
        )
      })

      it('should throw when no children is provided', () => {
        expect(() => <ScreenComponent id={id}>{ }</ScreenComponent>).toThrowError()
        expect(() =>
          <ScreenComponent id={id}>
          </ScreenComponent>
        ).toThrowError()
      })

      it('should throw when no children is bypassed trough linter', () => {
        expect(() => <ScreenComponent id={id}>{[]}</ScreenComponent>).toThrowError()
      })
    })

    describe('SafeArea', () => {
      it('should set the safeArea passed through props', () => {
        const expectedSafeArea = {
          top: false,
          bottom: true,
          leading: true,
          trailing: false,
        }

        expectComponentToBeCorrect(
          <ScreenComponent id={id} safeArea={expectedSafeArea}>{children}</ScreenComponent>,
          name,
          {
            ...options,
            properties: {
              ...options.properties,
              safeArea: expectedSafeArea,
            },
          },
        )
      })

      it('should set all safeAre props as true when safeArea is true', () => {
        expectComponentToBeCorrect(
          <ScreenComponent id={id} safeArea={true}>{children}</ScreenComponent>,
          name,
          {
            ...options,
            properties: {
              ...options.properties,
              safeArea: {
                top: true,
                bottom: true,
                leading: true,
                trailing: true,
              },
            },
          },
        )
      })
    })

    describe('NavigationBar', () => {
      const navigationBar: NavigationBar = {
        title: 'Test NavigationBar Title',
        showBackButton: false,
        navigationBarItems: [
          {
            text: 'Test Item',
            onPress: alert('Test item clicked!'),
          },
        ],
        backButtonAccessibility: undefined,
      }

      it('should pass the navigation bar as part of the set of properties of ScreenComponent', () => {
        expectComponentToBeCorrect(
          <ScreenComponent id={id} navigationBar={navigationBar}>{children}</ScreenComponent>,
          name,
          { ...options, properties: { ...options.properties, navigationBar } },
        )
      })
    })
  })
})
