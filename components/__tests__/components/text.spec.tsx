import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { omit } from 'lodash'
import { colors } from 'src/color'
import { Text, TextProps } from '../../src/components/text'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('Text', () => {
    const name = 'text'
    const id = 'test-text'
    const props: TextProps = {
      textColor: colors.aqua,
      alignment: 'LEFT',
      styleId: 'test-text-style-id',
      accessibility: {
        accessible: true,
        accessibilityLabel: 'Text Accessibility Label',
        isHeader: false,
      },
      style: {
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
      },
      children: ['Test', ' ', 'Text'],
    }
    const options = {
      id,
      properties: {
        ...omit(props, 'children'),
        text: 'Test Text',
      },
    }

    it('should create component with text as a property', () => {
      expectComponentToBeCorrect(
        <Text
          id={id}
          textColor={props.textColor}
          alignment={props.alignment}
          styleId={props.styleId}
          accessibility={props.accessibility}
          style={props.style}
        >
          {props.children}
        </Text>,
        name,
        options,
      )
    })

    describe('Validations', () => {
      describe('Colors', () => {
        it('should create with valid color', () => {
          expectComponentToBeCorrect(
            <Text
              id={id}
              textColor={props.textColor}
              alignment={props.alignment}
              styleId={props.styleId}
              accessibility={props.accessibility}
              style={props.style}
            >
              {props.children}
            </Text>,
            name,
            options,
          )
        })

        it('should throw with valid color', () => {
          expect(() =>
            expectComponentToBeCorrect(
              <Text
                id={id}
                textColor="#test123"
                alignment={props.alignment}
                styleId={props.styleId}
                accessibility={props.accessibility}
                style={props.style}
              >
                {props.children}
              </Text>,
              name,
              options,
            )
          ).toThrowError()
        })
      })
    })
  })
})
