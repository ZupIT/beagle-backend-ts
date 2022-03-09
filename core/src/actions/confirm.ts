import { Expression, isDynamicExpression } from '..'
import { Actions, Action, ActionProps } from '../model/action'
import { createCoreAction } from './core-action'

export interface ConfirmParams {
  /**
   * The title of the dialog. It doesn't work on web platforms.
   */
  title?: Expression<string>,
  /**
   * The text to show inside the dialog.
   */
  message: Expression<string>,
  /**
   * Actions to run when the confirmation button is pressed.
   */
  onPressOk?: Actions,
  /**
   * Actions to run when the cancellation button is pressed.
   */
  onPressCancel?: Actions,
  /**
   * The label of the button to confirm. It doesn't work on web platforms.
   *
   * @defaultValue `'OK'`
   */
  labelOk?: string,
  /**
   * The label of the button to cancel. It doesn't work on web platforms.
   *
   * @defaultValue `'Cancel'`
   */
  labelCancel?: string,
}

type ConfirmProps = ActionProps<ConfirmParams>

const confirmAction = createCoreAction<ConfirmParams>('confirm')

interface ConfirmFunction {
  /**
   * Opens up a system dialog box to show a confirmation message to the user.
   *
   * @param message the text to show inside the dialog.
   * @returns an instance of Action
   */
  (message: ConfirmProps['message']): Action,
  /**
   * Opens up a system dialog box to show a confirmation message to the user.
   *
   *@param options the options for the dialog box: title, message, labelOk, onPressOk, labelCancel and onPressCancel.
   * See {@link ConfirmParams}.
   * @returns an instance of Action
   */
  (options: ConfirmProps): Action,
}

/** @category Actions */
export const confirm: ConfirmFunction = args => (typeof args === 'string' || isDynamicExpression(args))
  ? confirmAction({ message: args as Expression<string> })
  : confirmAction(args as ActionProps<ConfirmParams>)
