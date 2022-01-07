import { RootContext } from '@zup-it/ds-schema-core'
import { mapValues } from 'lodash'
import { hasAnyValue } from '../utils/map'
import { CornerRadius, EdgeValue, Flex, Position, Size, Style, UnitValue } from './original-styles'
import {
  EachCornerRadius, SimpleCornerRadius, SimpleFlex, SimpleMargin, SimplePadding, SimplePosition, SimpleSize,
  SimpleStyle, SimpleUnitValue,
} from './simple-styles'

function fromSimpleCornerRadius(cornerRadius?: SimpleCornerRadius): CornerRadius | undefined {
  if (cornerRadius === undefined) return
  const each = cornerRadius as EachCornerRadius
  const isSingleRadius = typeof cornerRadius === 'number' || cornerRadius instanceof RootContext
  return {
    radius: isSingleRadius ? cornerRadius : undefined,
    bottomLeft: each.bottomLeft,
    bottomRight: each.bottomRight,
    topLeft: each.topLeft,
    topRight: each.topRight,
  }
}

function fromSimpleUnitValue(value?: SimpleUnitValue): UnitValue | undefined {
  if (value === undefined) return
  if (typeof value === 'number' || value instanceof RootContext) return { type: 'REAL', value }
  if (typeof value === 'string') return { type: 'PERCENT', value: parseFloat(value.replace('%', '')) }
  return value as UnitValue
}

function fromSimplePosition(position: SimplePosition): Position | undefined {
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
  edge: T extends 'margin' ? SimpleMargin : SimplePadding,
): EdgeValue | undefined {
  const hasAnyEdge = hasAnyValue(edge)
  const anyEdge = edge as SimpleMargin & SimplePadding
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

function fromSimpleFlex(flex: SimpleFlex): Flex | undefined {
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

function fromSimpleSize(size: SimpleSize): Size | undefined {
  const hasAnySize = hasAnyValue(size)
  const { aspectRatio, ...simpleUnitValueProps } = size
  const unitValueProps = mapValues(simpleUnitValueProps, fromSimpleUnitValue)
  return hasAnySize ? {
    aspectRatio,
    ...unitValueProps,
  } : undefined
}

export function fromSimpleStyle(style?: SimpleStyle): Style | undefined {
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
