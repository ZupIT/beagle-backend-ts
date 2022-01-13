import { BeagleJSX, Actions, FC, WithContext, WithChildren } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface SafeArea {
  top?: boolean,
  bottom?: boolean,
  leading?: boolean,
  trailing?: boolean,
}

interface NavigationBarItem extends WithAccessibility {
  image?: string,
  text?: string,
  action?: Actions,
  id?: string,
}

interface NavigationBar extends WithTheme {
  title: string,
  showBackButton?: boolean,
  navigationBarItems?: NavigationBarItem[],
  backButtonAccessibility?: WithAccessibility['accessibility'],
}

interface ScreenProps extends WithStyle, WithContext, Required<WithChildren> {
  safeArea?: SafeArea,
  navigationBar?: NavigationBar,
}

export const ScreenComponent: FC<ScreenProps> = ({ id, context, children, style, ...props }) => (
  <StyledDefaultComponent name="screen" id={id} context={context} style={style} properties={props}>
    {children}
  </StyledDefaultComponent>
)
