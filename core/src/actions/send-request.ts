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
  message: string,
}

interface BaseSendRequestParams {
  url: Expression<string>,
  method?: Expression<HttpMethod>,
  headers?: Expression<Record<string, string>>,
  data?: any,
  onFinish?: Actions,
}

interface SendRequestActionParams extends BaseSendRequestParams {
  onSuccess?: Actions,
  onError?: Actions,
}

interface EnhancedSendRequestParams<SuccessResponse, ErrorResponse> extends BaseSendRequestParams {
  onSuccess?: (response: AnyContextNode<ResponseContext<SuccessResponse>>) => Actions,
  onError?: (response: AnyContextNode<ErrorContext<ErrorResponse>>) => Actions,
}

export type SendRequestParams<SuccessResponse = any, ErrorResponse = any> = (
  ActionProps<BaseSendRequestParams> & EnhancedSendRequestParams<SuccessResponse, ErrorResponse>
)

const sendRequestAction = createCoreAction<SendRequestActionParams>('sendRequest')

export function sendRequest <SuccessResponse = any, ErrorResponse = any>(
  { onError, onSuccess, ...other }: SendRequestParams<SuccessResponse, ErrorResponse>,
) {
  // fixme: remove as any and fix type
  const onErrorResult = onError ? onError(new ContextNode('onError') as any) : undefined
  const onSuccessResult = onSuccess ? onSuccess(new ContextNode('onSuccess') as any) : undefined
  return sendRequestAction({ onError: onErrorResult, onSuccess: onSuccessResult, ...other })
}
