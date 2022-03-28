import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { omit } from 'lodash'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { NavigationBar, ScreenComponent, ScreenProps } from '../../src/components/screen-component'
import { Container } from '../../src/components/container'
import { Text } from '../../src/components/text'
import { Button } from '../../src/components/button'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('ScreenComponent', () => {
    const name = 'screencomponent'
    const id = 'test-screencomponent'
    const context = createContext('screen-component-context-id')
    const props: ScreenProps = {
      safeArea: undefined,
      navigationBar: undefined,
      style: {
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
      },
      children: [<Text>This is the child test case.</Text>, <Button>Click me</Button>],
      context,
    }
    const options = {
      id,
      context,
      properties: {
        ...omit(props, ['context', 'children']),
        child: <Container>{props.children}</Container>,
        style: props.style,
      },
    }

    it('should create component with its children under the "child" property', () => {
      expectComponentToBeCorrect(
        <ScreenComponent
          id={id}
          context={props.context}
          safeArea={props.safeArea}
          navigationBar={props.navigationBar}
          style={props.style}
        >
          {props.children}
        </ScreenComponent>,
        name,
        options,
      )
    })

    describe('Children', () => {
      it('should set the child as the Component passed, when children is a single child', () => {
        const singleChild = <Text>This is the child test case.</Text>
        expectComponentToBeCorrect(
          <ScreenComponent
            id={id}
            context={props.context}
            safeArea={props.safeArea}
            navigationBar={props.navigationBar}
            style={props.style}
          >
            {singleChild}
          </ScreenComponent>,
          name,
          { ...options, properties: { ...options.properties, child: singleChild } },
        )
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
          <ScreenComponent
            id={id}
            context={props.context}
            safeArea={expectedSafeArea}
            navigationBar={props.navigationBar}
            style={props.style}
          >
            {props.children}
          </ScreenComponent>,
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
          <ScreenComponent
            id={id}
            context={props.context}
            safeArea={true}
            navigationBar={props.navigationBar}
            style={props.style}
          >
            {props.children}
          </ScreenComponent>,
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
          <ScreenComponent
            id={id}
            context={props.context}
            safeArea={props.safeArea}
            navigationBar={navigationBar}
            style={props.style}
          >
            {props.children}
          </ScreenComponent>,
          name,
          { ...options, properties: { ...options.properties, navigationBar } },
        )
      })
    })
  })
})
