import { isDynamicExpression } from '@zup-it/beagle-backend-core'
import { InterpolatedText } from '../types'

const stringable = (value: any) => typeof value !== 'object' || isDynamicExpression(value)
const formatTextUnit = (text: any) => ((text && typeof text === 'object') ? JSON.stringify(text) : text ?? '')

export const childrenToInterpolatedText = (children: InterpolatedText) =>
  (Array.isArray(children) ? children : [children])
    .map(child => stringable(child) ? child : formatTextUnit(child))
    .join('')
