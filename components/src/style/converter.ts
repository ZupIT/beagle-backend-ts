import { Expression, isDynamicExpression } from '@zup-it/beagle-backend-core'
import { mapValues } from 'lodash'
import { hasAnyValue } from '../utils/map'
import { FullCornerRadius, EdgeValue, FullFlex, FullPosition, FullSize, FullStyle, UnitValue } from './full-styles'
import { EachCornerRadius, CornerRadius, Flex, Margin, Padding, Position, Size, Style, StyleValue } from './simple-styles'

function fromSimpleCornerRadius(cornerRadius?: CornerRadius): FullCornerRadius | undefined {
  if (cornerRadius === undefined) return
  const each = cornerRadius as EachCornerRadius
  const isSingleRadius = typeof cornerRadius === 'number' || isDynamicExpression(cornerRadius)
  return {
    radius: isSingleRadius ? cornerRadius as Expression<number> : undefined,
    bottomLeft: each.bottomLeft,
    bottomRight: each.bottomRight,
    topLeft: each.topLeft,
    topRight: each.topRight,
  }
}

function fromSimpleUnitValue(value?: StyleValue): UnitValue | undefined {
  if (value === undefined) return
  if (typeof value === 'number' || isDynamicExpression(value)) {
    return { type: 'REAL', value: value as Expression<number> }
  }
  if (typeof value === 'string') return { type: 'PERCENT', value: parseFloat(value.replace('%', '')) }
  return value as UnitValue
}

function fromSimplePosition(position: Position): FullPosition | undefined {
  const hasAnyPosition = hasAnyValue(position)
  const { top, right, bottom, left } = position
  return hasAnyPosition ? {
    top: fromSimpleUnitValue(top),
    right: fromSimpleUnitValue(right),
    bottom: fromSimpleUnitValue(bottom),
    left: fromSimpleUnitValue(left),
  } : undefined
}

function fromSimpleEdge<T extends 'margin' | 'padding'>(
  name: T,
  edge: T extends 'margin' ? Margin : Padding,
): EdgeValue | undefined {
  const hasAnyEdge = hasAnyValue(edge)
  const anyEdge = edge as Margin & Padding
  return hasAnyEdge ? {
    all: fromSimpleUnitValue(anyEdge[name]),
    top: fromSimpleUnitValue(anyEdge[`${name}Top`]),
    right: fromSimpleUnitValue(anyEdge[`${name}Right`]),
    bottom: fromSimpleUnitValue(anyEdge[`${name}Bottom`]),
    left: fromSimpleUnitValue(anyEdge[`${name}Left`]),
    vertical: fromSimpleUnitValue(anyEdge[`${name}Vertical`]),
    horizontal: fromSimpleUnitValue(anyEdge[`${name}Horizontal`]),
    start: fromSimpleUnitValue(anyEdge[`${name}Start`]),
    end: fromSimpleUnitValue(anyEdge[`${name}End`]),
  } : undefined
}

function fromSimpleFlex(flex: Flex): FullFlex | undefined {
  const hasAnyFlexProperty = hasAnyValue(flex)
  const {
    justifyContent, flexWrap, flexDirection, alignSelf, alignItems, flex: factor, alignContent, flexBasis, flexGrow,
    flexShrink,
  } = flex
  return hasAnyFlexProperty ? {
    alignContent,
    alignItems,
    alignSelf,
    flexDirection,
    flexWrap,
    justifyContent,
    basis: fromSimpleUnitValue(flexBasis),
    flex: factor,
    grow: flexGrow,
    shrink: flexShrink,
  } : undefined
}

function fromSimpleSize(size: Size): FullSize | undefined {
  const hasAnySize = hasAnyValue(size)
  const { aspectRatio, ...simpleUnitValueProps } = size
  const unitValueProps = mapValues(simpleUnitValueProps, fromSimpleUnitValue)
  return hasAnySize ? {
    aspectRatio,
    ...unitValueProps,
  } : undefined
}

/**
 * Converts the simplified style of our JSX components to the style objected expected by the frontend.
 *
 * @param style the simplified style.
 * @returns the style object expected by the frontend.
 */
export function fromSimpleStyle(style?: Style): FullStyle | undefined {
  if (!style) return
  const {
    aspectRatio, backgroundColor, borderColor, borderWidth, bottom, cornerRadius, display, height, left, margin, flex,
    marginBottom, marginEnd, padding, marginHorizontal, marginLeft, marginRight, marginStart, marginTop, marginVertical,
    maxHeight, maxWidth, minHeight, minWidth, paddingBottom, paddingEnd, paddingHorizontal, paddingLeft, paddingRight,
    paddingStart, paddingTop, paddingVertical, position, right, top, width, flexBasis, flexGrow, flexShrink, flexWrap,
    alignContent, alignItems, alignSelf, flexDirection, justifyContent,
  } = style
  return {
    backgroundColor,
    borderColor,
    borderWidth,
    display,
    positionType: position,
    cornerRadius: fromSimpleCornerRadius(cornerRadius),
    position: fromSimplePosition({ top, right, bottom, left }),
    padding: fromSimpleEdge('padding', {
      padding, paddingVertical, paddingTop, paddingStart, paddingRight, paddingLeft, paddingHorizontal, paddingEnd,
      paddingBottom,
    }),
    margin: fromSimpleEdge('margin', {
      margin, marginVertical, marginTop, marginStart, marginRight, marginLeft, marginHorizontal, marginEnd,
      marginBottom,
    }),
    flex: fromSimpleFlex({
      alignContent, flex, alignItems, alignSelf, flexBasis, flexDirection, flexWrap, flexGrow, justifyContent,
      flexShrink,
    }),
    size: fromSimpleSize({ height, maxHeight, maxWidth, minHeight, minWidth, width, aspectRatio }),
  }
}
