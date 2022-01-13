import { React, FC, Actions, WithChildren } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

interface TouchableProps extends Required<WithChildren> {
  onPress: Actions,
}

export const Touchable: FC<TouchableProps> = ({ id, children, ...props }) => (
  <DefaultComponent name="touchable" id={id} properties={props}>
    {children}
  </DefaultComponent>
)
