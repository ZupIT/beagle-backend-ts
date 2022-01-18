import { isDynamicExpression } from '../utils'
import { Actions, ActionInterface, ActionProps } from '../model/action'
import { Expression } from '../types'
import { createCoreAction } from './core-action'

interface Alert {
  /**
   * The title of the dialog. It doesn't work on web platforms.
   */
  title?: Expression<string>,
  /**
   * The text to show inside the dialog.
   */
  message: Expression<string>,
  /**
   * The label of the button to close the dialog. Default is "OK". It doesn't work on web platforms.
   */
  labelOk?: string,
  /**
   * Actions to run when the OK button is pressed.
   */
  onPressOk?: Actions,
}

type AlertProps = ActionProps<Alert>

const alertAction = createCoreAction<Alert>('alert')

interface AlertFunction {
  /**
   * Opens up a system dialog box to show an alert message to the user.
   *
   * @param message the text to show inside the dialog.
   * @returns an instance of Action
   */
  (message: AlertProps['message']): ActionInterface,
  /**
   * Opens up a system dialog box to show an alert message to the user.
   *
   * @param options the options for the dialog box: title, message, labelOk and onPressOk. See {@link Alert}.
   * @returns an instance of Action
   */
  (options: AlertProps): ActionInterface,
}

export const alert: AlertFunction = args => (typeof args === 'string' || isDynamicExpression(args))
  ? alertAction({ message: args as Expression<string> })
  : alertAction(args as ActionProps<Alert>)
