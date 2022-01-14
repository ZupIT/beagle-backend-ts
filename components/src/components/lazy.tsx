import { BeagleJSX } from '../jsx'
import { FC, Component } from '@zup-it/beagle-backend-core'
import { DefaultComponent } from '../default-component'

interface LazyProps {
  path: string,
  initialState: Component,
}

export const Lazy: FC<LazyProps> = ({ id, ...props }) => (
  <DefaultComponent name="lazy" id={id} properties={props} />
)
