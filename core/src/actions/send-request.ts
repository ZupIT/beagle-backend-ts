import { Expression, Actions, ContextNode } from '..'
import { ActionProps } from '../model/action'
import { AnyContextNode } from '../model/context/types'
import { HttpMethod } from '../types'
import { createCoreAction } from './core-action'

interface ResponseContext<T> {
  status: number,
  statusText: string,
  data: T,
}

interface ErrorContext<T> extends ResponseContext<T> {
  /**
   * If an exception is thrown, this contains the error message.
   */
  message?: string,
}

interface BaseSendRequestParams {
  /**
   * The URL to send the request to.
   */
  url: Expression<string>,
  /**
   * The method of the request. Default is "get".
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

interface SendRequestActionParams extends BaseSendRequestParams {
  /**
   * Actions to run when the request succeeds.
   */
  onSuccess?: Actions,
  /**
   * Actions to run when the request fails.
   */
  onError?: Actions,
}

interface EnhancedSendRequestParams<SuccessResponse, ErrorResponse> extends BaseSendRequestParams {
  /**
   * An action factory. This needs to return the actions to run once the request succeeds.
   *
   * This function receives as parameter the context for the onSuccess event, i.e. a context containing the status,
   * statusText and data of the response.
   *
   * Example:
   * ```
   * sendRequest<User, Error>(
   *   // ...
   *   onSuccess: (response) => alert(`Username is ${response.get('data').get('name')}`)
   * )
   * ```
   */
  onSuccess?: (response: AnyContextNode<ResponseContext<SuccessResponse>>) => Actions,
  /**
   * An action factory. This needs to return the actions to run once the request fails.
   *
   * This function receives as parameter the context for the onError event, i.e. a context containing the status,
   * statusText and data of the response.
   *
   * Example:
   * ```
   * sendRequest<User, string>(
   *   // ...
   *   onError: (response) => alert(`An error occurred. ${response.get('data')}`)
   * )
   * ```
   */
  onError?: (response: AnyContextNode<ErrorContext<ErrorResponse>>) => Actions,
}

export type SendRequestParams<SuccessResponse = any, ErrorResponse = any> = (
  ActionProps<BaseSendRequestParams> & EnhancedSendRequestParams<SuccessResponse, ErrorResponse>
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
 * Example:
 * ```
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
 * @param options the parameters of the sendRequest action: url, method, headers, data, onSuccess, onError and onFinish.
 * See {@link EnhancedSendRequestParams} and {@link BaseSendRequestParams} for more details.
 * @returns an instance of Action
 */
export function sendRequest <SuccessResponse = any, ErrorResponse = any>(
  { onError, onSuccess, ...other }: SendRequestParams<SuccessResponse, ErrorResponse>,
) {
  // fixme: remove as any and fix type
  const onErrorResult = onError ? onError(new ContextNode('onError') as any) : undefined
  const onSuccessResult = onSuccess ? onSuccess(new ContextNode('onSuccess') as any) : undefined
  return sendRequestAction({ onError: onErrorResult, onSuccess: onSuccessResult, ...other })
}
