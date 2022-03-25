import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { colors } from 'src/color'
import { fromSimpleStyle } from '../../src/style/converter'
import { Text, TextProps } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Text', () => {
    const name = 'text'
    const id = 'test-text'
    const props: Partial<TextProps> = {
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
    }
    const options = {
      id,
      properties: {
        ...props,
        text: 'Test Text',
        style: fromSimpleStyle(props.style),
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
          Test Text
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
              Test Text
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
                Test Text
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
