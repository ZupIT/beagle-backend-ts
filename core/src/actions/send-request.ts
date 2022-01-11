import { Expression, Actions } from '..'
import { ActionInterface, ActionProps } from '../model/action'
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

interface SpecificSendRequestParams<SuccessResponse, ErrorResponse> {
  url: Expression<string>,
  method?: Expression<HttpMethod>,
  headers?: Expression<Record<string, string>>,
  data?: any,
  onSuccess?: (response: AnyContextNode<ResponseContext<SuccessResponse>>) => Actions,
  onError?: (response: AnyContextNode<ErrorContext<ErrorResponse>>) => Actions,
  onFinish?: Actions,
}

export type SendRequestParams<SuccessResponse = any, ErrorResponse = any> = (
  ActionProps<SpecificSendRequestParams<SuccessResponse, ErrorResponse>>
)

type SendRequestFn = <SuccessResponse = any, ErrorResponse = any>(
  props: SendRequestParams<SuccessResponse, ErrorResponse>,
) => ActionInterface

export const sendRequest = createCoreAction('sendRequest') as SendRequestFn
