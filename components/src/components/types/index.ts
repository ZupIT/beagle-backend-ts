import { Context, Operation } from '@zup-it/beagle-backend-core'

type InterpolatedTextAcceptableTypes =
  string |
  number |
  boolean |
  Context<any> |
  Operation<any> |
  { [K: string]: InterpolatedTextAcceptableTypes }

export type InterpolatedText = InterpolatedTextAcceptableTypes | InterpolatedTextAcceptableTypes[]
