import { React, FC } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

interface ScrollViewProps {
  scrollDirection?: 'HORIZONTAL' | 'VERTICAL',
  scrollBarEnabled?: boolean,
}

export const ScrollView: FC<ScrollViewProps> = ({ id, context, children, ...props }) => (
  <DefaultComponent name="scrollView" id={id} context={context} properties={props}>
    {children}
  </DefaultComponent>
)
