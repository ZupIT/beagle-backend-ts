import { BeagleJSX, ComponentProps } from '@zup-it/beagle-backend-core'
import { BaseImageProps, Image, LocalMobileImage, LocalWebImage, RemoteImageProps } from '../../src/components/image'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('ImageComponent', () => {
    const name = 'image'
    const id = 'test-image'

    describe('Remote Image', () => {
      it('should create component', () => {
        const properties: BaseImageProps<'remote'> & RemoteImageProps = {
          type: 'remote',
          url: 'https://server.com/image.png',
          placeholder: {
            mobileId: 'image-mobile-id',
          },
          mode: 'FIT_XY',
        }
        expectComponentToBeCorrect(
          <Image
            id={id}
            type={properties.type}
            mode={properties.mode}
            url={properties.url}
            placeholder={properties.placeholder}
          />,
          name,
          {
            id,
            properties: {
              mode: properties.mode,
              path: {
                '_beagleImagePath_': properties.type,
                url: properties.url,
                placeholder: properties.placeholder,
              },
            },
          },
        )
      })
    })

    describe('Local Web Image', () => {
      it('should create component', () => {
        const properties: ComponentProps<BaseImageProps<'local'> & LocalWebImage> = {
          url: 'https://server.com/image.png',
          type: 'local',
          mode: 'CENTER_CROP',
        }
        expectComponentToBeCorrect(
          <Image id={id} type={properties.type} url={properties.url} mode={properties.mode} />,
          name,
          {
            id,
            properties: {
              mode: properties.mode,
              path: {
                '_beagleImagePath_': properties.type,
                url: properties.url,
              },
            },
          },
        )
      })
    })

    describe('Local Mobile Image', () => {
      const properties: ComponentProps<BaseImageProps<'local'> & LocalMobileImage> = {
        mobileId: 'image-mobile-id',
        type: 'local',
        mode: 'FIT_CENTER',
      }
      expectComponentToBeCorrect(
        <Image id={id} type={properties.type} mobileId={properties.mobileId} mode={properties.mode} />,
        name,
        {
          id,
          properties: {
            mode: properties.mode,
            path: {
              '_beagleImagePath_': properties.type,
              mobileId: properties.mobileId,
            },
          },
        },
      )
    })

    describe('Local Web & Mobile Image', () => {
      const properties: ComponentProps<BaseImageProps<'local'> & LocalWebImage> = {
        url: 'https://server.com/image.png',
        mobileId: 'image-mobile-id',
        type: 'local',
        mode: undefined,
      }
      expectComponentToBeCorrect(
        <Image
          id={id}
          type={properties.type}
          url={properties.url}
          mobileId={properties.mobileId}
          mode={properties.mode}
        />,
        name,
        {
          id,
          properties: {
            mode: properties.mode,
            path: {
              '_beagleImagePath_': properties.type,
              url: properties.url,
              mobileId: properties.mobileId,
            },
          },
        },
      )
    })
  })
})
