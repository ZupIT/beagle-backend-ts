import { coreNamespace } from '../constants'
import { Action, ActionFunction } from '../model/action'

export const createCoreAction = <Props = any>(name: string): ActionFunction<Props> => (
  { analytics, ...properties },
  // fixme: the casting below should not be necessary
) => new Action({ name, namespace: coreNamespace, analytics, properties: properties as Props })
