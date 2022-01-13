import { React, FC, Expression } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'
import { validateColor } from '../validations'

interface PageIndicatorProps {
  selectedColor: string,
  unselectedColor: string,
  numberOfPages?:	number,
  currentPage?:	Expression<number>,
}

export const PageIndicator: FC<PageIndicatorProps> = ({ id, ...props }) => {
  validateColor(props.selectedColor)
  validateColor(props.unselectedColor)
  return <DefaultComponent name="pageIndicator" id={id} properties={props} />
}
