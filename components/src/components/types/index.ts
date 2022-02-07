import { AnyContextNode, Operation } from '@zup-it/beagle-backend-core'

type InterpolatedTextAcceptableTypes =
  string |
  number |
  boolean |
  AnyContextNode<any> |
  Operation<any> |
  { [K: string]: InterpolatedTextAcceptableTypes }

export type InterpolatedText = InterpolatedTextAcceptableTypes | InterpolatedTextAcceptableTypes[]
