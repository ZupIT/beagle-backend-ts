import { Expression } from '@zup-it/beagle-backend-core'
import { Flex, Style } from './original-styles'
import { CornerRadius, EdgeValue, Position, Size, UnitValue } from './original-styles'

export type SimpleUnitValue = Expression<number> | `${number}%` | UnitValue

export type SimpleSize = {
  [K in keyof Size]: Size[K] extends UnitValue ? SimpleUnitValue : Size[K]
}

export type SimplePosition = {
  [K in keyof Position]: SimpleUnitValue
}

type EachEdge<Type extends string> = {
  [K in keyof Omit<EdgeValue, 'all'> as `${Type}${Capitalize<K>}`]: SimpleUnitValue
}

export type EachMargin = EachEdge<'margin'>

export type SimpleMargin = EachMargin & {
  margin?: SimpleUnitValue,
}

export type EachPadding = EachEdge<'padding'>

export type SimplePadding = EachPadding & {
  padding?: SimpleUnitValue,
}

export type EachCornerRadius = Omit<CornerRadius, 'radius'>

export type SimpleCornerRadius = Expression<number> | EachCornerRadius

export type SimpleFlex = Omit<Flex, 'basis' | 'grow' | 'shrink'> & {
  flexBasis?: SimpleUnitValue,
  flexGrow?: Flex['grow'],
  flexShrink?: Flex['shrink'],
}

export type SimpleStyle = (
  Pick<Style, 'backgroundColor' | 'display' | 'borderColor' | 'borderWidth'>
  & { cornerRadius?: SimpleCornerRadius, position?: Style['positionType'] }
  & SimpleSize
  & SimpleMargin
  & SimplePadding
  & SimplePosition
  & SimpleFlex
)
