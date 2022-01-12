import { React, FC, Expression } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, Style } from '../style/styled'
import { Accessibility, Theme } from '../types'

interface LocalPath {
  url: string,
  mobileId: string,
}

interface RemotePath {
  url: string,
  placeholder?: LocalPath,
}

type ImagePath = LocalPath | RemotePath

interface SpecificImageProps {
  path: ImagePath | Expression<string>,
  mode?: 'FIT_XY' | 'FIT_CENTER' | 'CENTER_CROP' | 'CENTER',
}

type ImageProps = SpecificImageProps & Accessibility & Theme & Style

export const Image: FC<ImageProps> = ({ id, style, ...props }) =>
  <StyledDefaultComponent name="image" id={id} style={style} properties={props} />
