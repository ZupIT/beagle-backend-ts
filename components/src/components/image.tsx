import { React, ComponentProps, Expression, Component } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent } from '../style/styled'
import { WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

export interface Local {
  /**
   * Used only for web applications: path relative to the client
   */
  url?: string,
  mobileId?: string,
}

interface Remote {
  url: string,
  placeholder?: Local,
}

type ImageType = 'local' | 'remote'

interface ImageProps<T extends ImageType> extends WithAccessibility, WithTheme, WithStyle {
  type: T,
  path: Expression<T extends 'local' ? Local : Remote>,
  mode?: 'FIT_XY' | 'FIT_CENTER' | 'CENTER_CROP' | 'CENTER',
}

export type AllProps<T extends ImageType> = ComponentProps<ImageProps<T>>

export type ImageFC = <T extends 'local' | 'remote'>(props: AllProps<T>) => Component

const ImageComponent = ({ id, style, type, ...props }: AllProps<'local' | 'remote'>) => (
  <StyledDefaultComponent name="image" id={id} style={style} properties={{ ...props, '_beagleImagePath_': type }} />
)

export const Image = ImageComponent as ImageFC
