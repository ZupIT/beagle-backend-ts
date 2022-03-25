import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { colors } from 'src/color'
import { Text, TextProps } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Text', () => {
    const name = 'text'
    const id = 'test-text'
    const properties: Partial<TextProps> = {
      textColor: colors.aqua,
      alignment: 'LEFT',
    }
    const options = {
      id,
      properties: {
        ...properties,
        text: 'Test Text',
      },
    }

    it('should create component with text as a property', () => {
      expectComponentToBeCorrect(
        <Text id={id} textColor={properties.textColor} alignment={properties.alignment}>Test Text</Text>,
        name,
        options,
      )
    })

    describe('Validations', () => {
      describe('Colors', () => {
        it('should create with valid color', () => {
          expectComponentToBeCorrect(
            <Text id={id} textColor={properties.textColor} alignment={properties.alignment}>Test Text</Text>,
            name,
            options,
          )
        })

        it('should throw with valid color', () => {
          expect(() =>
            expectComponentToBeCorrect(
              <Text id={id} textColor="#test123" alignment={properties.alignment}>Test Text</Text>,
              name,
              options,
            )
          ).toThrowError()
        })
      })
    })
  })
})
