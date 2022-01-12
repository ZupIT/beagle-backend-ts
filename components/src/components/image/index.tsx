import { React } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent } from '../../style/styled'
import { ImageFC, AllProps } from './types'

const ImageComponent = ({ id, style, type, ...props }: AllProps<'local' | 'remote'>) => (
  <StyledDefaultComponent name="image" id={id} style={style} properties={{ ...props, '_beagleImagePath_': type }} />
)

export const Image = ImageComponent as ImageFC
