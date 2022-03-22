import { pick } from 'lodash'
import { Expression } from '../types'
import { Actions, ActionProps } from '../model/action'
import { createContextNode } from '../model/context/context-node'
import { Context } from '../model/context/types'
import { HttpMethod } from '../types'
import { createCoreAction } from './core-action'

export interface ResponseContext<T> {
  status: number,
  statusText: string,
  data: T,
}

export interface ErrorContext<T> extends ResponseContext<T> {
  /**
   * The message in the exception thrown.
   */
  message: string,
}

export interface BaseSendRequestParams {
  /**
   * The URL to send the request to.
   */
  url: Expression<string>,
  /**
   * The method of the request.
   *
   * @defaultValue `'get'`
   */
  method?: Expression<HttpMethod>,
  /**
   * The headers to send with this request.
   */
  headers?: Expression<Record<string, string>>,
  /**
   * The body to send in this request. This is invalid for get requests.
   */
  data?: any,
  /**
   * Actions to run when the request finished. This is run after onSuccess and onError.
   */
  onFinish?: Actions,
}

export interface SendRequestActionParams extends BaseSendRequestParams {
  /**
   * Actions to run when the request succeeds.
   */
  onSuccess?: Actions,
  /**
   * Actions to run when the request fails.
   */
  onError?: Actions,
}

export interface EnhancedSendRequestParams<SuccessResponse, ErrorResponse> extends BaseSendRequestParams {
  /**
   * An action factory. This needs to return the actions to run once the request succeeds.
   *
   * This function receives as parameter the context for the onSuccess event, i.e. a context containing the status,
   * statusText and data of the response.
   *
   * @example
   * ```typescript
   * sendRequest<User, Error>(
   *   // ...
   *   onSuccess: (response) => alert(`Username is ${response.get('data').get('name')}`)
   * )
   * ```
   */
  onSuccess?: (response: Context<ResponseContext<SuccessResponse>>) => Actions,
  /**
   * An action factory. This needs to return the actions to run once the request fails.
   *
   * This function receives as parameter the context for the onError event, i.e. a context containing the status,
   * statusText and data of the response.
   *
   * @example
   * ```typescript
   * sendRequest<User, string>(
   *   // ...
   *   onError: (response) => alert(`An error occurred. ${response.get('data')}`)
   * )
   * ```
   */
  onError?: (response: Context<ErrorContext<ErrorResponse>>) => Actions,
}

export type SendRequestParams<SuccessResponse = any, ErrorResponse = any> = (
  ActionProps<BaseSendRequestParams & EnhancedSendRequestParams<SuccessResponse, ErrorResponse>>
)

const sendRequestAction = createCoreAction<SendRequestActionParams>('sendRequest')

/**
 * Makes an HTTP request to the given address. By default the request is a "get", but the method, headers and body can
 * be customized via the parameters options.url, options.method, options.headers and options.data.
 *
 * When the request finishes, the event onSuccess or onError is triggered, depending on the result. After that, onFinish
 * is triggered anyway.
 *
 * OnSuccess and onError must be action factories, i.e. they must be a function that returns all actions that must be
 * run once the event is triggered. The onSuccess event needs a function that receives the successful result as
 * parameter. The onError needs a function that receives the failed result as parameter. For more information, check
 * {@link EnhancedSendRequestParams}.
 *
 * The onFinish event is not a function, the actions must be given directly, it should not depend on the result.
 *
 * @example:
 * ```typescript
 * interface User {
 *   name: string,
 *   age: number,
 * }
 *
 * const loading = createContext('loading', false)
 *
 * const loadUser = [
 *   loading.set(true),
 *   sendRequest<User, string>(
 *     url: 'https://myapi.com/user/1'
 *     onSuccess: (response) => alert(`Username is ${response.get('data').get('name')}`),
 *     onError: (response) => alert(`An error occurred. ${response.get('data')}`),
 *     onFinish: loading.set(false),
 *   ),
 * ]
 * ```
 *
 * @category Actions
 * @param options the parameters of the sendRequest action: url, method, headers, data, onSuccess, onError and onFinish.
 * See {@link EnhancedSendRequestParams} and {@link BaseSendRequestParams} for more details.
 * @returns an instance of Action
 */
export function sendRequest<SuccessResponse = any, ErrorResponse = any>(
  { onError, onSuccess, ...other }: SendRequestParams<SuccessResponse, ErrorResponse>,
) {
  const onErrorResult = onError ? onError(createContextNode('onError')) : undefined
  const onSuccessResult = onSuccess ? onSuccess(createContextNode('onSuccess')) : undefined
  return sendRequestAction({ onError: onErrorResult, onSuccess: onSuccessResult, ...other })
}

interface ComposeRequest<SuccessResponse = any, ErrorResponse = any> {
  <Options extends object, Curried extends Partial<SendRequestParams<SuccessResponse, ErrorResponse>>>(
    fn: (options: Options) => Curried,
  ): (
    (options: Options & Omit<SendRequestParams<SuccessResponse, ErrorResponse>, keyof Curried>) =>
      ReturnType<typeof sendRequest>
  ),
}

const sendRequestKeys: (keyof SendRequestParams)[] = [
  'analytics', 'data', 'headers', 'method', 'onError', 'onFinish', 'onSuccess', 'url',
]

/**
 * This function can be used to compose a sendRequest action.
 *
 * Let's say we want function to fetch the product of id "prd-01". We generally don't wanna mix UI with network, so,
 * instead of calling sendRequest directly with the url to the backend, we create a function called fetchProductById
 * that receives the productId and the others options and create the send request action.
 *
 * The idea here is to let the developer compose a sendRequest action, instead of passing every parameter at once. In
 * the example below, we set both the url and method options of the send request, so the final function (value of
 * fetchProductById) only needs the remaining options.
 *
 * You can still say what's the response type and error with generics.
 *
 * @example
 * ```typescript
 * interface Options {
 *   id: string,
 * }
 *
 * export const fetchProductById = request<Product>()
 *  .compose(({ id }: Options) => ({ url: `https://myserver.com/products/${id}`, method: 'get' }))
 * ```
 *
 * Now, in the UI code, `fetchProductById` can be used by only passing the id, no url or method are needed:
 *
 * ```
 * const MyScreen = () => (
 *   <Container onInit={fetchProductById({ id: 5, onSuccess: response => alert(product.title) })} />
 * )
 * ```
 *
 * @returns a composable request
 */
export function request<SuccessResponse = any, ErrorResponse = any>() {
  const compose: ComposeRequest<SuccessResponse, ErrorResponse> = curryFn => (options) => {
    const curryOptions = curryFn(options)
    const allOptions = { ...options, ...curryOptions }
    const sendRequestOptions = pick(allOptions, sendRequestKeys) as SendRequestParams
    return sendRequest(sendRequestOptions)
  }

  return {
    /**
     * Use this function to compose a request.
     *
     * Please check {@link request} for more details.
     *
     * @param curryFn function to create the options for the sendRequest action
     * @returns a function to create a sendRequest action
     */
    compose,
  }
}
