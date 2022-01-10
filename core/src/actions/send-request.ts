import { Expression, Actions, Analytics } from '..'
import { AnyContextNode } from '../model/context/types'
import { HttpMethod } from '../types'
import { CoreAction } from './core-action'

interface ResponseContext<T> {
  status: number,
  statusText: string,
  data: T,
}

interface ErrorContext<T> extends ResponseContext<T> {
  message: string,
}

interface SendRequestParams<SuccessResponse, ErrorResponse> {
  url: Expression<string>,
  method?: Expression<HttpMethod>,
  headers?: Expression<Record<string, string>>,
  data?: any,
  onSuccess?: (response: AnyContextNode<ResponseContext<SuccessResponse>>) => Actions,
  onError?: (response: AnyContextNode<ErrorContext<ErrorResponse>>) => Actions,
  onFinish?: Actions,
}

export const sendRequest = <SuccessResponse, ErrorResponse>(
  { analytics, ...properties }: SendRequestParams<SuccessResponse, ErrorResponse> & Analytics,
) => new CoreAction({ name: 'sendRequest', properties, analytics })
