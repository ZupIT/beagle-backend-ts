import { React, Actions, FC } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface SafeArea {
  top?: boolean,
  bottom?: boolean,
  leading?: boolean,
  trailing?: boolean,
}

interface NavigationBarItem extends Accessibility {
  image?: string,
  text?: string,
  action?: Actions,
  id?: string,
}

interface NavigationBar extends Theme {
  title: string,
  showBackButton?: boolean,
  navigationBarItems?: NavigationBarItem[],
  backButtonAccessibility?: Accessibility['accessibility'],
}

interface SpecificScreenProps {
  safeArea?: SafeArea,
  navigationBar?: NavigationBar,
}

type ScreenProps = SpecificScreenProps & Theme & Style

export const ScreenComponent: FC<ScreenProps> = ({ id, context, children, style, ...props }) => (
  <StyledDefaultComponent name="screen" id={id} context={context} style={style} properties={props}>
    {children}
  </StyledDefaultComponent>
)
