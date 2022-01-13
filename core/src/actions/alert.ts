import { isDynamicExpression } from '../utils'
import { Actions, ActionInterface, ActionProps } from '../model/action'
import { Expression } from '../types'
import { createCoreAction } from './core-action'

interface Alert {
  title?: Expression<string>,
  message: Expression<string>,
  labelOk?: string,
  onPressOk?: Actions,
}

type AlertProps = ActionProps<Alert>

const alertAction = createCoreAction<Alert>('alert')

interface AlertFunction {
  (message: AlertProps['message']): ActionInterface,
  (options: AlertProps): ActionInterface,
}

export const alert: AlertFunction = args => (typeof args === 'string' || isDynamicExpression(args))
  ? alertAction({ message: args as Expression<string> })
  : alertAction(args as ActionProps<Alert>)
