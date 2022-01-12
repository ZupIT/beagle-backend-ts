import { Expression } from '@zup-it/beagle-backend-core'
import { sendRequest, SendRequestParams } from '@zup-it/beagle-backend-core/actions/index'
import { baseUrl } from './constants'

export interface User {
  name: string,
  age: number,
  id: string,
  sex: 'M' | 'F' | 'O',
}

export const getUserById = (
  id: Expression<string>,
  options: Omit<SendRequestParams<User>, 'url' | 'method'>,
) => sendRequest<User>({ url: `${baseUrl}/user/${id}`, ...options })
