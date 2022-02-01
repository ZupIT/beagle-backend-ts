import { Expression } from '@zup-it/beagle-backend-core'

type InterpolatedTextAcceptableTypes =
  string |
  number |
  boolean |
  InterpolatedTextAcceptableTypes[] |
  { [K: string]: InterpolatedTextAcceptableTypes }

export type InterpolatedText = Expression<InterpolatedTextAcceptableTypes>
