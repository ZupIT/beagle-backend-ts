import { Actions } from '@zup-it/beagle-backend-core'
import {
  PopStackParams, PopToViewParams, PopViewParams, PushStackParams, PushViewParams,
  ResetApplicationParams, ResetStackParams,
} from '@zup-it/beagle-backend-core/actions'
import { Screen, ScreenRequest } from '..'
import { ScreenNavigation } from '../screen'
import { HasRequiredProperty } from '../utils/types'

export interface ControllerId {
  controllerId?: string,
}

type PushStack<T extends ScreenRequest> = ScreenNavigation<T, PushStackParams> & ControllerId
type PushView<T extends ScreenRequest> = ScreenNavigation<T, PushViewParams> & ControllerId
type PopView<T extends ScreenRequest> = Pick<ScreenNavigation<T, PopViewParams>, 'navigationContext' | 'analytics'>
type PopStack<T extends ScreenRequest> = Pick<ScreenNavigation<T, PopStackParams>, 'navigationContext' | 'analytics'>
type PopToView<T extends ScreenRequest> = Pick<ScreenNavigation<T, PopToViewParams>, 'navigationContext' | 'analytics'>
type ResetStack<T extends ScreenRequest> = ScreenNavigation<T, ResetStackParams> & ControllerId
type ResetApplication<T extends ScreenRequest> = ScreenNavigation<T, ResetApplicationParams> & ControllerId

type NavigationAction<T extends ScreenRequest, N> = HasRequiredProperty<T> extends true
  ? [screen: Screen<T>, properties: N] : [screen: Screen<T>, properties?: N]

export interface PushStackAction {
  <T extends ScreenRequest>(...args: NavigationAction<T, PushStack<T>>): Actions,
}

export interface PushViewAction {
  <T extends ScreenRequest>(...args: NavigationAction<T, PushView<T>>): Actions,
}

export interface PopViewAction {
  <T extends ScreenRequest>(properties?: PopView<T>): Actions,
}

export interface PopStackAction {
  <T extends ScreenRequest>(properties?: PopStack<T>): Actions,
}

export interface PopToViewAction {
  <T extends ScreenRequest>(...args: NavigationAction<T, PopToView<T>>): Actions,
}

export interface ResetStackAction {
  <T extends ScreenRequest>(...args: NavigationAction<T, ResetStack<T>>): Actions,
}

export interface ResetApplicationAction {
  <T extends ScreenRequest>(...args: NavigationAction<T, ResetApplication<T>>): Actions,
}
