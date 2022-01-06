export interface BaseAction<T> {
  namespace: string,
  name: string,
  parameters: T,
  analytics?: AnalyticsConfig<T>,
}

export type ActionConstructor<T = void> = T & Pick<BaseAction<T>, 'analytics'>

export type AnalyticsConfig<T> = false | {
  additionalEntries?: Record<string, any>,
  attributes: keyof T[],
}

export type Actions = BaseAction<any> | BaseAction<any>[]
