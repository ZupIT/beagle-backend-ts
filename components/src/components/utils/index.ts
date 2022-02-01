import { InterpolatedText } from '../types'

export const childrenToInterpolatedText = (children: InterpolatedText) =>
  Array.isArray(children) ? children.join('') : [children].join('')
