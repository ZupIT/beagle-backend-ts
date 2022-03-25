import { createContextNode } from '@zup-it/beagle-backend-core'
import { validateColor } from 'src/validations'

describe('Validations', () => {
  describe('Color', () => {
    it('should pass validation for expression', () => validateColor(createContextNode<string>('ctx')))
    it('should pass validation for #RGB', () => validateColor('#FFF'))
    it('should pass validation for #RGBA', () => validateColor('#0A19'))
    it('should pass validation for #RRGGBB', () => validateColor('#17ABEF'))
    it('should pass validation for #RRGGBBAA', () => validateColor('#0239CDEE'))
    it('should not pass validation for RGB (missing #)', () => expect(() => validateColor('AAA')).toThrow())
    it('should not pass validation for #R', () => expect(() => validateColor('#0')).toThrow())
    it('should not pass validation for #RG', () => expect(() => validateColor('#00112')).toThrow())
    it('should not pass validation for #RRGGB', () => expect(() => validateColor('#00112')).toThrow())
    it('should not pass validation for #RRGGBBA', () => expect(() => validateColor('#001122334')).toThrow())
    it('should not pass validation for #RRGGBBAAA', () => expect(() => validateColor('#00112233445')).toThrow())
    it('should not pass validation for non-hexadecimal characters', () => expect(() => validateColor('#0BG')).toThrow())
  })
})
