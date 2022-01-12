import { React, FC, Expression } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'
import { validateColor } from '../validations'

interface SpecificPageIndicatorProps {
  selectedColor: string,
  unselectedColor: string,
  numberOfPages?:	number,
  currentPage?:	Expression<number>,
}

type PageIndicatorProps = SpecificPageIndicatorProps & Accessibility & Theme & Style

export const PageIndicator: FC<PageIndicatorProps> = ({ id, style, ...props }) => {
  validateColor(props.selectedColor)
  validateColor(props.unselectedColor)
  return <StyledDefaultComponent name="pageIndicator" id={id} style={style} properties={props} />
}

