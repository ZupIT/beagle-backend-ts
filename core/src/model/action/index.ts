import { lowerFirst } from 'lodash'
import { genericNamespace } from '../../constants'
import { ActionConstructor, BaseAction } from './types'

export abstract class Action<Params> implements BaseAction<Params> {
  constructor({ analytics, ...other }: ActionConstructor<Params>) {
    this.parameters = other as Params
    this.analytics = analytics
    this.name ??= lowerFirst(this.constructor.name)
  }

  namespace = genericNamespace
  name
  parameters
  analytics
}
