import { Expression } from '@zup-it/beagle-backend-core'
import { Flex, Style } from './original-styles'
import { CornerRadius, Size, Position, UnitValue } from './original-styles'

/**
 * A SimpleUnitValue is used to express dimensions as absolute or percentage values. It can be:
 * - an object containing the value and unit;
 * - a number or expression that yields a number, equivalent to `{ value: number, unit: 'REAL' }`;
 * - a string in the format '$number%', equivalent to `{ value: number, unit: 'PERCENT' }`;
 */
export type SimpleUnitValue = Expression<number> | `${number}%` | UnitValue

export type SimpleSize = {
  [K in keyof Size]: Size[K] extends (UnitValue | undefined) ? SimpleUnitValue : Size[K]
}

export type SimplePosition = {
  [K in keyof Position]: SimpleUnitValue
}

export type SimpleMargin = {
  /**
   * Sets the top space between this component and the content around it.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  marginTop?: SimpleUnitValue,
  /**
   * Sets the bottom space between this component and the content around it.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  marginBottom?: SimpleUnitValue,
  /**
   * Sets the top and bottom space between this component and the content around it, i.e. it sets both marginTop and
   * marginBottom at once.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  marginVertical?: SimpleUnitValue,
  /**
   * Sets the left space between this component and the content around it.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  marginLeft?: SimpleUnitValue,
  /**
   * Sets the right space between this component and the content around it.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  marginRight?: SimpleUnitValue,
  /**
   * Sets the left and right space between this component and the content around it, i.e. it sets both marginLeft and
   * marginRight at once.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  marginHorizontal?: SimpleUnitValue,
  /**
   * This is useful for always putting a margin at the start of a text, despite the language.
   *
   * Equivalent to marginLeft for devices using languages that is read from left to right (LTR).
   * Equivalent to marginRight for devices using languages that is read from right to left (RTL).
   */
  marginStart?: SimpleUnitValue,
  /**
   * This is useful for always putting a margin at the end of a text, despite the language.
   *
   * Equivalent to marginRight for devices using languages that is read from left to right (LTR).
   * Equivalent to marginLeft for devices using languages that is read from right to left (RTL).
   */
  marginEnd?: SimpleUnitValue,
  /**
   * Sets the space between this component and the content around it. This defines the margin for every side at once.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  margin?: SimpleUnitValue,
}

export type SimplePadding = {
  /**
   * Sets the space between the top of this component and its content.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  paddingTop?: SimpleUnitValue,
  /**
   * Sets the space between the bottom of this component and its content.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  paddingBottom?: SimpleUnitValue,
  /**
   * Sets the space between the top and bottom of this component and its content., i.e. it sets both paddingTop and
   * paddingBottom at once.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  paddingVertical?: SimpleUnitValue,
  /**
   * Sets the space between the left side of this component and its content.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  paddingLeft?: SimpleUnitValue,
  /**
   * Sets the space between the right side of this component and its content.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  paddingRight?: SimpleUnitValue,
  /**
   * Sets the space between the left and right sides of this component and its content., i.e. it sets both paddingLeft
   * and paddingRight at once.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  paddingHorizontal?: SimpleUnitValue,
  /**
   * This is useful for always putting a padding at the start of a text, despite the language.
   *
   * Equivalent to paddingLeft for devices using languages that is read from left to right (LTR).
   * Equivalent to paddingRight for devices using languages that is read from right to left (RTL).
   */
  paddingStart?: SimpleUnitValue,
  /**
   * This is useful for always putting a padding at the end of a text, despite the language.
   *
   * Equivalent to paddingRight for devices using languages that is read from left to right (LTR).
   * Equivalent to paddingLeft for devices using languages that is read from right to left (RTL).
   */
  paddingEnd?: SimpleUnitValue,
  /**
   * Sets the space between this component and its content. This defines the padding for every side at once.
   *
   * See: https://yogalayout.com/docs/margins-paddings-borders
   */
  padding?: SimpleUnitValue,
}

export type EachCornerRadius = Omit<CornerRadius, 'radius'>

export type SimpleCornerRadius = Expression<number> | EachCornerRadius

export type SimpleFlex = Omit<Flex, 'basis' | 'grow' | 'shrink'> & {
  /**
   * An axis-independent way of providing the default size of an item along the main axis. Defaults to 'AUTO'.
   *
   * See: https://yogalayout.com/docs/flex
   */
  flexBasis?: SimpleUnitValue,
  /**
   * Describes how any space within a container should be distributed among its children along the main axis.
   *
   * See: https://yogalayout.com/docs/flex
   */
  flexGrow?: Flex['grow'],
  /**
   * Describes how to shrink children along the main axis in the case that the total size of the children overflow the
   * size of the container on the main axis.
   *
   * See: https://yogalayout.com/docs/flex
   */
  flexShrink?: Flex['shrink'],
}

export type SimpleStyle = (
  Pick<Style, 'backgroundColor' | 'display' | 'borderColor' | 'borderWidth'>
  & {
    /**
     * Masks the corners of this element with circles to make rounded corners. The value expected here is
     * the radius of the circle. The bigger the radius the more rounded the corner.
     *
     * Use 0 for no rounded corners and half the element's size for full circles.
     *
     * This properties expects a single value to set all corners at once or an object where each corner can be set
     * separately.
     */
    cornerRadius?: SimpleCornerRadius,
    /**
     * Tells how the element should be positioned: 'ABSOLUTE' or 'RELATIVE'.
     *
     * Use 'ABSOLUTE' to make elements float in the screen. Use 'RELATIVE' to make element follow the layout of it's
     * parent and siblings. Defaults to 'ABSOLUTE'.
     *
     * Attention: when using 'ABSOLUTE' as the position, the last elements to appear in the component tree are rendered
     * on top of the previous elements. Adjust the element order to achieve the desired appearance, we have no
     * equivalent to the z-index property of web applications.
     */
    position?: Style['positionType'],
  }
  & SimpleSize
  & SimpleMargin
  & SimplePadding
  & SimplePosition
  & SimpleFlex
)
