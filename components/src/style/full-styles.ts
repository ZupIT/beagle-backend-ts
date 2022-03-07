import { Expression } from '@zup-it/beagle-backend-core'
import { Color } from '../color'

type FlexDirection = 'COLUMN' | 'ROW' | 'COLUMN_REVERSE' | 'ROW_REVERSE'

type FlexWrap = 'NO_WRAP' | 'WRAP' | 'WRAP_REVERSE'

type JustifyContent = (
  'FLEX_START'
  | 'CENTER'
  | 'FLEX_END'
  | 'SPACE_BETWEEN'
  | 'SPACE_AROUND'
  | 'SPACE_EVENLY'
)

type AlignContent = (
  'FLEX_START'
  | 'CENTER'
  | 'FLEX_END'
  | 'SPACE_BETWEEN'
  | 'SPACE_AROUND'
  | 'STRETCH'
)

type AlignItems = (
  'FLEX_START'
  | 'CENTER'
  | 'FLEX_END'
  | 'BASELINE'
  | 'STRETCH'
)

type AlignSelf = AlignItems | 'AUTO'

type FlexDisplay = 'FLEX' | 'NONE'

type FlexPosition = 'ABSOLUTE' | 'RELATIVE'

export interface UnitValue {
  /**
   * The numerical value.
   */
  value: Expression<number>,
  /**
   * Use 'REAL' for absolute values, 'PERCENT' for relative values. 'AUTO' is reserved and will probably be removed in a
   * future version, avoid it.
   */
  type: 'REAL' | 'PERCENT' | 'AUTO',
}

export interface FullSize {
  /**
   * The exact width of this component.
   *
   * See: https://yogalayout.com/docs/width-height
   */
  width?: UnitValue,
  /**
   * The exact height of this component.
   *
   * See: https://yogalayout.com/docs/width-height
   */
  height?: UnitValue,
  /**
   * The component must not be larger (width) than maxWidth. Defaults to infinite.
   *
   * See: https://yogalayout.com/docs/min-max
   */
  maxWidth?: UnitValue,
  /**
   * The component must not be taller (height) than maxHeight. Defaults to infinite.
   *
   * See: https://yogalayout.com/docs/min-max
   */
  maxHeight?: UnitValue,
  /**
   * The component must be at least as large (width) as `minWidth`. Defaults to 0.
   *
   * See: https://yogalayout.com/docs/min-max
   */
  minWidth?: UnitValue,
  /**
   * The component must be at least as tall (height) as `minHeight`. Defaults to 0.
   *
   * See: https://yogalayout.com/docs/min-max
   */
  minHeight?: UnitValue,
  /**
   * Sets an aspect ratio so the width or height can be calculate according to the other one without the need for
   * specifying both.
   *
   * See: https://yogalayout.com/docs/aspect-ratio/
   */
  aspectRatio?: number,
}

export interface FullPosition {
  /**
   * Most useful when the position is 'ABSOLUTE'. It defines where to start drawing considering the parent's left
   * position.
   *
   * See: https://yogalayout.com/docs/absolute-relative-layout
   */
  left?: UnitValue,
  /**
   * Most useful when the position is 'ABSOLUTE'. It defines where to start drawing considering the parent's top
   * position.
   *
   * See: https://yogalayout.com/docs/absolute-relative-layout
   */
  top?: UnitValue,
  /**
   * Most useful when the position is 'ABSOLUTE'. It defines where to start drawing considering the parent's right
   * position.
   *
   * See: https://yogalayout.com/docs/absolute-relative-layout
   */
  right?: UnitValue,
  /**
   * Most useful when the position is 'ABSOLUTE'. It defines where to start drawing considering the parent's bottom
   * position.
   *
   * See: https://yogalayout.com/docs/absolute-relative-layout
   */
  bottom?: UnitValue,
}

export interface EdgeValue extends FullPosition {
  start?: UnitValue,
  end?: UnitValue,
  horizontal?: UnitValue,
  vertical?: UnitValue,
  all?: UnitValue,
}

export interface FullFlex {
  /**
   * The direction to place the children of this component.
   *
   * See: https://yogalayout.com/docs/flex-direction/
   */
  flexDirection?: FlexDirection,
  /**
   * By default the elements will shrink when they overflow the space available ('NO_WRAP'). This property controls this
   * behavior, allowing the elements to wrap to another row or column.
   *
   * See: https://yogalayout.com/docs/flex-wrap/
   */
  flexWrap?: FlexWrap,
  /**
   * Alignment of the children in the main axis (flex-direction). Defaults to 'FLEX_START'.
   *
   * See: https://yogalayout.com/docs/justify-content/
   */
  justifyContent?: JustifyContent,
  /**
   * Alignment of the children in the cross axis (opposite to the flex-direction). Defaults to 'STRETCH'.
   *
   * See: https://yogalayout.com/docs/align-items/
   */
  alignItems?: AlignItems,
  /**
   * Cross axis alignment of this element in regards to its parent. Defaults to 'AUTO', i.e. to the parent's
   * "alignItems".
   *
   * See: https://yogalayout.com/docs/align-items/
   */
  alignSelf?: AlignSelf,
  /**
   * The distribution of lines along the cross-axis when the content wraps. Defaults to 'FLEX_START'.
   *
   * See: https://yogalayout.com/docs/align-content/
   */
  alignContent?: AlignContent,
  basis?: UnitValue,
  /**
   * Sets the value for grow, shrink and basis at the same time.
   *
   * Example: if you want 3 elements in the screen and wants all 3 to occupy the same space, use `flex: 1` for all of
   * them. If you want the first to occupy 2/3 of the screen while the other two shares the remaining space, use
   * `flex: 4` for the first element and `flex: 1` for the other two.
   *
   * See: https://yogalayout.com/docs/flex
   */
  flex?: number,
  grow?: number,
  shrink?: number,
}

export interface FullCornerRadius {
  radius?: Expression<number>,
  topLeft?: Expression<number>,
  topRight?: Expression<number>,
  bottomLeft?: Expression<number>,
  bottomRight?: Expression<number>,
}

export interface FullStyle {
  /**
   * The color for the background in the hex format: #RGB, #RGBA, #RRGGBB or #RRGGBBAA, where R is red, G is green, B is
   * blue and A is alpha (opacity). Defaults to transparent.
   */
  backgroundColor?: Expression<Color>,
  cornerRadius?: FullCornerRadius,
  flex?: FullFlex,
  positionType?: FlexPosition,
  /**
   * Use 'FLEX' to display the element or 'NONE' to hide it. When hidden, the component doesn't occupy any space or
   * margin. Defaults to 'FLEX'.
   */
  display?: Expression<FlexDisplay>,
  size?: FullSize,
  margin?: EdgeValue,
  padding?: EdgeValue,
  position?: FullPosition,
  /**
   * The size of the border. Defaults to zero (no border).
   */
  borderWidth?: Expression<number>,
  /**
   * The color of the border. Defaults to black on every platform, but Android, where it defaults to transparent.
   */
  borderColor?: Expression<string>,
}
