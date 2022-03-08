import { BeagleJSX, FC, Expression, Actions, WithChildren, WithContext } from '@zup-it/beagle-backend-core'
import { Color } from '../color'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility } from '../types'
import { Container } from './container'

export interface PullToRefreshProps extends WithAccessibility, WithStyle, Required<WithChildren>, WithContext {
  /**
   * Actions to run once the user makes the gesture to scroll up the screen and the scroll bar is already at the top.
   */
  onPull?: Actions,
  /**
   * If true an animated spinner shows at the top of the screen.
   *
   * @defaultValue `false`
   */
  isRefreshing?: Expression<boolean>,
  /**
   * The color of the animated spinner.
   */
  color?: Expression<Color>,
}

/**
 * Creates a ScrollView that, if pulled hard enough, triggers an event. This component exists only for mobile platforms
 * and will not be rendered in web applications.
 *
 * This is generally used to refresh the contents of the screen. As a general rule, it should be the direct child of
 * a screen component or the root node of the UI tree.
 *
 * @example
 * ```tsx
 * interface Summary {
 *   balance: number,
 *   futureTransactions: number,
 * }
 *
 * interface SummaryContext {
 *   isRefreshing: boolean,
 *   data: Summary,
 * }
 *
 * const summary = createContext<SummaryContext>('summary')
 *
 * const loadSummary = sendRequest<Summary>({
 *   url: 'https://myapi.com/summary',
 *   onSuccess: response => summary.get('data').set(response.get('data')),
 *   onFinish: summary.get('isRefreshing').set(false),
 * })
 *
 * const refreshSummary = [summary.get('isRefreshing').set(true), loadSummary]
 *
 * const MyScreen = () => (
 *   <ScreenComponent context={summary} onInit={loadSummary}>
 *     <PullToRefresh isRefreshing={isRefreshing} onPull={refreshSummary}>
 *       <Text>{`Balance: ${summary.get('data').get('balance')}`}</Text>
 *       <Text>{`Future transactions: ${summary.get('data').get('futureTransactions')}`}</Text>
 *     </PullToRefresh>
 *   </ScreenComponent>
 * )
 * ```
 *
 * In the example above we setup a behavior to refresh the bank account data every time the user makes the gesture
 * to pull down the screen.
 *
 * @category Component
 * @param props the component properties. See: {@link PullToRefreshProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const PullToRefresh: FC<PullToRefreshProps> = ({ id, style, children, ...props }) => {
  // the frontend always expect a single child for the PullRoRefresh component
  const child = Array.isArray(children) ? <Container>{children}</Container> : children
  return <StyledDefaultComponent name="pullToRefresh" id={id} style={style} properties={{ ...props, child }} />
}
