import { Expression, Actions } from '..'
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

export class SendRequest<SuccessResponse, ErrorResponse = SuccessResponse>
  extends CoreAction<SendRequestParams<SuccessResponse, ErrorResponse>> {}
