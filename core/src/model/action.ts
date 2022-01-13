import { genericNamespace } from '../constants'

export type AnalyticsConfig<Props> = false | {
  additionalEntries?: Record<string, any>,
  attributes: (keyof Props)[],
}

export interface Analytics<Props = any> {
  analytics?: AnalyticsConfig<Props>,
}

export interface ActionInterface<Props = any> {
  namespace?: string,
  name: string,
  properties?: Props,
  analytics?: AnalyticsConfig<Props>,
}

export type ActionProps<Props> = Props & Analytics<Props>

export type ActionFunction<Props> = (props: ActionProps<Props>) => ActionInterface

export type Actions = ActionInterface | ActionInterface[]

export class Action<Props = any> implements ActionInterface<Props> {
  constructor({ name, analytics, namespace = genericNamespace, properties }: ActionInterface<Props>) {
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

export const createAction = <Props = any>(name: string, namespace?: string): ActionFunction<Props> => (
  { analytics, ...properties },
) => new Action<Props>({ name, namespace, analytics, properties: properties as Props })
