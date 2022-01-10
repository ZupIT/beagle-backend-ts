import { Analytics, Actions } from '../model/action'
import { CoreAction } from './core-action'

interface Alert {
  title?: string,
  message?: string,
  labelOk?: string,
  onPressOk?: Actions,
}

export const alert = ({ analytics, ...properties }: Alert & Analytics) => (
  new CoreAction({ name: 'alert', properties, analytics })
)
