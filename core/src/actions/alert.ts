import { ContextNode } from '..'
import { Actions, ActionInterface, ActionProps } from '../model/action'
import { createCoreAction } from './core-action'

interface Alert {
  title?: string,
  message: string,
  labelOk?: string,
  onPressOk?: Actions,
}

type AlertProps = ActionProps<Alert>

const alertAction = createCoreAction<Alert>('alert')

interface AlertFunction {
  (message: AlertProps['message']): ActionInterface,
  (options: AlertProps): ActionInterface,
}

export const alert: AlertFunction = args => (typeof args === 'string' || args instanceof ContextNode)
  ? alertAction({ message: args })
  : alertAction(args as ActionProps<Alert>)
