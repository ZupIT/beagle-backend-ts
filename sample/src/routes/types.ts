import { ScreenRequest } from '@zup-it/beagle-backend-express'

export interface AppRequest extends ScreenRequest {
  headers: {
    'user-id': string,
  }
}
