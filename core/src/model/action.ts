type TrueMap = true | { [K: string]: TrueMap }

export type AnalyticsAttributesMap<T> = T extends (number | string | boolean | any[] | null | undefined)
  ? true
  : (T extends Record<string, any> ? { [K in keyof T]?: true | AnalyticsAttributesMap<T[K]> } : TrueMap)

export type AnalyticsConfig<Props> = false | {
  /**
   * Additional data to put in the analytics record. Example: `{ username: 'John', category: 'customer_level_6' }`.
   */
  additionalEntries?: Record<string, any>,
  /**
   * Properties of this action to expose in the analytics record. Example, if this is a navigation action and we want
   * to expose the url and headers, `attributes` would be:
   * ```typescript
   * {
   *   route: {
   *     url: true,
   *     headers: true,
   *   }
   * }
   * ```
   *
   * If you wanted to expose some particular headers:
   * ```typescript
   * {
   *   route: {
   *     url: true,
   *     headers: {
   *       'content-type': true,
   *       'my-header': true,
   *     },
   *   }
   * }
   * ```
   *
   * If you wanted to expose all the properties under `route`:
   * ```typescript
   * { route: true }
   * ```
   *
   * The default behavior is to follow the configuration in the front-end set up by the AnalyticsProvider. The
   * attributes specified here replaces the ones in the config. This is not a merge.
   */
  attributes?: AnalyticsAttributesMap<Props>,
}

export interface WithAnalytics<Props = any> {
  /**
   * Most of the analytics configuration is set in the front-end via the AnalyticsProvider interface. But, additional
   * configuration can also be set in the backend. The configuration here overwrites the one set in the front-end.
   *
   * If you want to disable the analytics for an action that, according to the front-end configuration, always generate
   * an analytics record when executed, just set this property to false.
   *
   * If you want to enable the analytics for an action, alter the attributes that are exposed, or send more data, just
   * set this property to an object of type {@link AnalyticsConfig}.
   */
  analytics?: AnalyticsConfig<Props>,
}

interface ActionInterface<Props = any> extends WithAnalytics<Props> {
  /**
   * The namespace for this action. Actions in beagle are identified by a string in the format "$namespace:$name", e.g
   * "beagle:alert".
   */
  namespace?: string,
  /**
   * The name for this action. Actions in beagle are identified by a string in the format "$namespace:$name", e.g
   * "beagle:alert".
   */
  name: string,
  /**
   * The properties for this action,
   */
  properties?: Props,
}

/**
 * Utility type to include the properties that should be included in every action.
 *
 * analytics is included.
 */
export type ActionProps<Props> = Props & WithAnalytics<Props>

/**
 * An Action factory.
 */
export type ActionFunction<Props> = (props: ActionProps<Props>) => Action

export type Actions = Action | Action[]

/**
 * An Action is a behavior to be triggered in the front-end application. Actions are always associated with events. For
 * instance, considering the library of default components, the Button has the onPress event and the Container has the
 * onInit event. Events can also be found in other actions, e.g. the sendRequest has the events onSuccess, onError and
 * onFinish.
 *
 * Both Actions and Operations end up as functions in the front-end, but their concept are very different! Operations
 * always have a return value, they transform their arguments in something else, so this something else can be used
 * instead. Operation functions never have colateral effects and are generally very simple. Action functions never have
 * a return value and they can have as many colateral effects as they want. They can also be very complex, the
 * sendRequest action, for instance, is a function that interacts with the network layer of the application.
 *
 * Some actions shipped with Beagle are: sendRequest, setContext, addChildren, alert, confirm and pushView.
 *
 * Example:
 * ```tsx
 * <Button
 *   onPress={new Action({
 *     name: 'alert',
 *     namespace: 'beagle',
 *     properties: { message: 'Hello World!' },
 *   })}
 * >
 *   Click me!
 * </Button>
 * ```
 *
 * This is not very nice and the type checking is quite bad. Instead of instantiating the action from within the
 * JSX, we create strictly typed functions that instantiate the actions for us. Check the example below:
 *
 * ```typescript
 * export const alert = (message: string) => new Action({ name: 'alert', namespace: 'beagle', properties: { message } })
 * ```
 *
 * Then, in our JSX code, we write:
 * ```tsx
 * <Button onPress={alert('Hello World!')}>Click me!</Button>
 * ```
 *
 * This is a very simple example and it omits many of the properties of an Alert action. To create an action factory
 * with all properties of an Action, check the helper method {@link createAction}.
 */
export class Action<Props = any> implements ActionInterface<Props> {
  /**
   * @param options the action parameters: namespace, name, properties and analytics. See {@link ActionInterface}.
   */
  constructor({ name, analytics, namespace, properties }: ActionInterface<Props>) {
    this.name = name
    this.namespace = namespace
    this.analytics = analytics
    this.properties = properties
  }

  namespace?
  name
  properties?
  analytics?
}

/**
 * Creates an {@link Action} Factory based on the properties passed in the generic. See the example below:
 * ```typescript
 * interface MyAlert {
 *   title?: Expression<string>,
 *   message: Expression<string>,
 *   icon?: string,
 * }
 *
 * export const myAlert = createAction<MyAlert>('my-alert', 'custom')
 * ```
 *
 * This creates a correctly typed Action factory that generates Action instances for the custom action "my-alert". To
 * use it in your screen, just call `myAlert`:
 *
 * ```tsx
 * <Button onPress={myAlert({ title: 'Hi!', message: 'Welcome to my app!', icon: 'happy-face'})}>Click me!</Button>
 * ```
 *
 * @param name the name for this action. Actions in beagle are identified by a string in the format "$namespace:$name",
 * e.g "beagle:alert".
 * @param namespace the namespace for this action.
 * @returns an Action Factory
 */
export const createAction = <Props = any>(name: string, namespace?: string): ActionFunction<Props> => (
  { analytics, ...properties },
) => new Action<Props>({ name, namespace, analytics, properties: properties as Props })
