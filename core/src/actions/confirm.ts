import { ContextNode, Expression } from '..'
import { Actions, ActionInterface, ActionProps } from '../model/action'
import { createCoreAction } from './core-action'

interface Confirm {
  title?: Expression<string>,
  message: Expression<string>,
  onPressOk?: Actions,
  onPressCancel?: Actions,
  labelOk?: string,
  labelCancel?: string,
}

type ConfirmProps = ActionProps<Confirm>

const confirmAction = createCoreAction<Confirm>('confirm')

interface AlertFunction {
  (message: ConfirmProps['message']): ActionInterface,
  (options: ConfirmProps): ActionInterface,
}

export const confirm: AlertFunction = args => (typeof args === 'string' || args instanceof ContextNode)
  ? confirmAction({ message: args })
  : confirmAction(args as ActionProps<Confirm>)
