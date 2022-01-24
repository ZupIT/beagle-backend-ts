import { BeagleJSX, Actions, FC, WithContext, WithChild } from '@zup-it/beagle-backend-core'
import { StyledSingleChildComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface SafeArea {
  /**
   * Makes the top of the screen safe. Defaults to false.
   */
  top?: boolean,
  /**
   * Makes the bottom of the screen safe. Defaults to false.
   */
  bottom?: boolean,
  /**
   * Makes the left side of the screen safe. Defaults to false.
   */
  leading?: boolean,
  /**
   * Makes the right side of the screen safe. Defaults to false.
   */
  trailing?: boolean,
}

interface NavigationBarItem extends WithAccessibility {
  /**
   * An image to render in the menu item. This should be the mobileId of the Image. The mobileId is the resource
   * identifier registered in DesignSystem (for Android and iOS) or BeagleTheme (for Flutter).
   */
  image?: string,
  /**
   * The title of the menu item.
   */
  text?: string,
  /**
   * The actions to run when the menu item is pressed.
   */
  action?: Actions,
  /**
   * An id for this menu item.
   */
  id?: string,
}

interface NavigationBar extends WithTheme {
  /**
   * The title of the current screen.
   */
  title: string,
  /**
   * Whether or not to show a back button. Defaults to true.
   */
  showBackButton?: boolean,
  /**
   * The menu items in the navigation bar.
   */
  navigationBarItems?: NavigationBarItem[],
  /**
   * Accessibility data for the back button.
   */
  backButtonAccessibility?: WithAccessibility['accessibility'],
}

interface ScreenProps extends WithStyle, WithContext, Required<WithChild> {
  /**
   * Creates a safe area view for the contents of this screen, i.e. makes sure the content won't be rendered under
   * the display's notch. Valid only for iOS and Flutter.
   *
   * Set it to true to enable the safe area for every side of the screen. Use a SafeArea object to tell which sides
   * should be safe and which sides should be not.
   */
  safeArea?: true | SafeArea,
  /**
   * Sets up a navigation bar with title, back button and menu.
   */
  navigationBar?: NavigationBar,
}

/**
 * Sets attributes for the entire screen in a mobile application. In a web application, it acts like a Container.
 *
 * This component is used for creating a safe area view (iOS) and for setting up a navigation bar with title and menu.
 *
 * @param props {@link ScreenProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const ScreenComponent: FC<ScreenProps> = ({ id, context, children, style, safeArea, ...props }) => {
  const finalSafeArea = safeArea === true ? { top: true, bottom: true, leading: true, trailing: true } : safeArea
  const properties = { ...props, safeArea: finalSafeArea }
  return (
    <StyledSingleChildComponent name="screen" id={id} context={context} style={style} properties={properties}>
      {children}
    </StyledSingleChildComponent>
  )
}
