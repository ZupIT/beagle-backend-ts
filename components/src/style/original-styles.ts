import { Expression } from '@zup-it/beagle-backend-core'
import { Color } from '../types'

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
  value: Expression<number>,
  type: 'REAL' | 'PERCENT' | 'AUTO',
}

export interface Size {
  width?: UnitValue,
  height?: UnitValue,
  maxWidth?: UnitValue,
  maxHeight?: UnitValue,
  minWidth?: UnitValue,
  minHeight?: UnitValue,
  aspectRatio?: number,
}

export interface Position {
  left?: UnitValue,
  top?: UnitValue,
  right?: UnitValue,
  bottom?: UnitValue,
}

export interface EdgeValue extends Position {
  start?: UnitValue,
  end?: UnitValue,
  horizontal?: UnitValue,
  vertical?: UnitValue,
  all?: UnitValue,
}

export interface Flex {
  flexDirection?: FlexDirection,
  flexWrap?: FlexWrap,
  justifyContent?: JustifyContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  alignContent?: AlignContent,
  basis?: UnitValue,
  flex?: number,
  grow?: number,
  shrink?: number,
}

export interface CornerRadius{
  radius?: Expression<number>,
  topLeft?: Expression<number>,
  topRight?: Expression<number>,
  bottomLeft?: Expression<number>,
  bottomRight?: Expression<number>,
}

export interface Style {
  backgroundColor?: Expression<Color>,
  cornerRadius?: CornerRadius,
  flex?: Flex,
  positionType?: FlexPosition,
  display?: Expression<FlexDisplay>,
  size?: Size,
  margin?: EdgeValue,
  padding?: EdgeValue,
  position?: Position,
  borderWidth?: Expression<number>,
  borderColor?: Expression<string>,
}
