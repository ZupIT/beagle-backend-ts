import { Component, coreNamespace } from '@zup-it/ds-schema-core'
import { fromSimpleStyle } from './converter'
import { Style } from './original-styles'
import { SimpleStyle } from './simple-styles'

type StyledParams<T> = T & { style?: Style }
type SimpleStyledParams<T> = T & { style?: SimpleStyle, id: string }

export abstract class StyledComponent<Params> extends Component<StyledParams<Params>> {
  constructor({ style: simpleStyle, id, ...other }: SimpleStyledParams<Params>, children?: Component<any>[]) {
    const style = fromSimpleStyle(simpleStyle)
    super({ style, id, ...(other as any) }, children)
  }

  namespace = coreNamespace
}
