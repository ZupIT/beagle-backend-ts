import { BeagleJSX, ComponentProps, Expression, Component } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent } from '../style/styled'
import { WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

export interface WithLocalImageUrl {
  /**
   * Used only for web applications: path relative to the client.
   */
  url: Expression<string>,
}

export interface WithMobileImageId {
  /**
   * Used only for mobile applications, it identifies an image resource in the DesignSystem (iOS and Android) or
   * BeagleTheme (Flutter).
   */
  mobileId: Expression<string>,
}

export type LocalWebImage = WithLocalImageUrl & Partial<WithMobileImageId>
export type LocalMobileImage = Partial<WithLocalImageUrl> & WithMobileImageId
export type LocalImageProps = LocalWebImage | LocalMobileImage

export interface RemoteImageProps {
  /**
   * The URL to fetch the image from.
   */
  url: Expression<string>,
  /**
   * A local image to use while the remote image is not available. This doesn't work for web applications, since
   * every image in a web application can be considered remote.
   */
  placeholder?: LocalImageProps,
}

export type ImageType = 'local' | 'remote'

export interface BaseImageProps<T extends ImageType = ImageType> extends WithAccessibility, WithTheme, WithStyle {
  /**
   * The image type: 'local' or 'remote'.
   */
  type: T,
  /**
   * The space available might be smaller or greater than the original image size. The mode tells how it's supposed
   * to display the image considering the space available. Default is 'FIT_CENTER'.
   *
   * - FIT_XY: stretches or shrinks the image both horizontally and vertically so it fits the space available. This can
   * alter the image proportions.
   * - FIT_CENTER: centers the image in the space available and resizes it so at least one of the axis occupies all the
   * available space. This resizing doesn't alter the image proportions, but there will be empty space if the image
   * proportions were not the same as the proportions of the space available.
   * - CENTER_CROP: centers the image in the space available and resizes it so one of the axis occupy all the space
   * available and other overflows the space. The image is then cropped. No empty space is left and proportions are
   * kept.
   * - CENTER: places the image in the center and doesn't resize it.
   */
  mode?: 'FIT_XY' | 'FIT_CENTER' | 'CENTER_CROP' | 'CENTER',
}

interface ImageFC {
  (props: ComponentProps<BaseImageProps<'remote'> & RemoteImageProps>): Component,
  (props: ComponentProps<BaseImageProps<'local'> & LocalWebImage>): Component,
  (props: ComponentProps<BaseImageProps<'local'> & LocalMobileImage>): Component,
}

export type ImageProps = ComponentProps<BaseImageProps & RemoteImageProps & LocalWebImage & LocalMobileImage>

const ImageComponent = ({ id, style, type, mode, ...path }: ImageProps) => (
  <StyledDefaultComponent
    name="image"
    id={id}
    style={style}
    properties={{ mode, path: { '_beagleImagePath_': type, ...path } }}
  />
)

/**
 * Renders an image. This image can be local or remote.
 *
 * In a web application, a local image is considered to be a url relative to the current page, while a remote image
 * is an absolute url, normally to another domain.
 *
 * In a mobile application, a local image is a resource that ships with the app, while a remote image is a resource
 * loaded from the internet.
 *
 * Images based in urls are pretty straight forward. Images based on a mobileId look for the given id in the frontend.
 * These ids must be registered under a DesignSystem (iOS or Android) or a BeagleTheme (Flutter).
 *
 * @example
 * ```tsx
 * <Container>
 *   <Image type="remote" url="https://server.com/image.png" />
 *   <Image type="local" url="/static/image.png" mobileId="image" />
 * </Container>
 * ```
 *
 * @category Component
 * @param props the properties for this component. See:  {@link ImageProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const Image = ImageComponent as ImageFC
