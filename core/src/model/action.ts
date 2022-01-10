import { genericNamespace } from '../constants'

export type AnalyticsConfig<Props> = false | {
  additionalEntries?: Record<string, any>,
  attributes: keyof Props[],
}

export interface Analytics<Props = any> {
  analytics?: AnalyticsConfig<Props>,
}

export interface ActionInterface<Props = any> {
  namespace: string | undefined,
  name: string,
  properties: Props | undefined,
  analytics: AnalyticsConfig<Props> | undefined,
}

export type Actions = ActionInterface | ActionInterface[]

export class Action<Props = any> implements ActionInterface<Props> {
  constructor({ name, analytics, namespace = genericNamespace, properties }: ActionInterface) {
    this.name = name
    this.namespace = namespace
    this.analytics = analytics
    this.properties = properties
  }

  namespace
  name
  properties
  analytics
}
