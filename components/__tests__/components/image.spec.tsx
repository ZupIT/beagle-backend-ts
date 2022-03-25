import { BeagleJSX, ComponentProps } from '@zup-it/beagle-backend-core'
import { fromSimpleStyle } from '../../src/style/converter'
import { BaseImageProps, Image, LocalMobileImage, LocalWebImage, RemoteImageProps } from '../../src/components/image'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('ImageComponent', () => {
    const name = 'image'
    const id = 'test-image'

    describe('Remote Image', () => {
      it('should create component', () => {
        const props: BaseImageProps<'remote'> & RemoteImageProps = {
          type: 'remote',
          url: 'https://server.com/image.png',
          placeholder: {
            mobileId: 'image-mobile-id',
          },
          mode: 'FIT_XY',
          styleId: 'test-button-style-id',
          accessibility: {
            accessible: true,
            accessibilityLabel: 'Button Accessibility Label',
            isHeader: false,
          },
          style: {
            borderColor: '#000',
            backgroundColor: '#fff',
            padding: 10,
          },
        }
        expectComponentToBeCorrect(
          <Image
            id={id}
            type={props.type}
            mode={props.mode}
            url={props.url}
            placeholder={props.placeholder}
            styleId={props.styleId}
            accessibility={props.accessibility}
            style={props.style}
          />,
          name,
          {
            id,
            properties: {
              mode: props.mode,
              style: fromSimpleStyle(props.style),
              path: {
                '_beagleImagePath_': props.type,
                url: props.url,
                placeholder: props.placeholder,
                styleId: props.styleId,
                accessibility: props.accessibility,
              },
            },
          },
        )
      })
    })

    describe('Local Web Image', () => {
      it('should create component', () => {
        const props: ComponentProps<BaseImageProps<'local'> & LocalWebImage> = {
          url: 'https://server.com/image.png',
          type: 'local',
          mode: 'CENTER_CROP',
          styleId: 'test-button-style-id',
          accessibility: {
            accessible: true,
            accessibilityLabel: 'Button Accessibility Label',
            isHeader: false,
          },
          style: {
            borderColor: '#000',
            backgroundColor: '#fff',
            padding: 10,
          },
        }
        expectComponentToBeCorrect(
          <Image
            id={id}
            type={props.type}
            url={props.url}
            mode={props.mode}
            styleId={props.styleId}
            accessibility={props.accessibility}
            style={props.style}
          />,
          name,
          {
            id,
            properties: {
              mode: props.mode,
              style: fromSimpleStyle(props.style),
              path: {
                '_beagleImagePath_': props.type,
                url: props.url,
                styleId: props.styleId,
                accessibility: props.accessibility,
              },
            },
          },
        )
      })
    })

    describe('Local Mobile Image', () => {
      const props: ComponentProps<BaseImageProps<'local'> & LocalMobileImage> = {
        mobileId: 'image-mobile-id',
        type: 'local',
        mode: 'FIT_CENTER',
        styleId: 'test-button-style-id',
        accessibility: {
          accessible: true,
          accessibilityLabel: 'Button Accessibility Label',
          isHeader: false,
        },
        style: {
          borderColor: '#000',
          backgroundColor: '#fff',
          padding: 10,
        },
      }
      expectComponentToBeCorrect(
        <Image
          id={id}
          type={props.type}
          mobileId={props.mobileId}
          mode={props.mode}
          styleId={props.styleId}
          accessibility={props.accessibility}
          style={props.style}
        />,
        name,
        {
          id,
          properties: {
            mode: props.mode,
            style: fromSimpleStyle(props.style),
            path: {
              '_beagleImagePath_': props.type,
              mobileId: props.mobileId,
              styleId: props.styleId,
              accessibility: props.accessibility,
            },
          },
        },
      )
    })

    describe('Local Web & Mobile Image', () => {
      const props: ComponentProps<BaseImageProps<'local'> & LocalWebImage> = {
        url: 'https://server.com/image.png',
        mobileId: 'image-mobile-id',
        type: 'local',
        mode: undefined,
        styleId: 'test-button-style-id',
        accessibility: {
          accessible: true,
          accessibilityLabel: 'Button Accessibility Label',
          isHeader: false,
        },
        style: {
          borderColor: '#000',
          backgroundColor: '#fff',
          padding: 10,
        },
      }
      expectComponentToBeCorrect(
        <Image
          id={id}
          type={props.type}
          url={props.url}
          mobileId={props.mobileId}
          mode={props.mode}
          styleId={props.styleId}
          accessibility={props.accessibility}
          style={props.style}
        />,
        name,
        {
          id,
          properties: {
            mode: props.mode,
            style: fromSimpleStyle(props.style),
            path: {
              '_beagleImagePath_': props.type,
              url: props.url,
              mobileId: props.mobileId,
              styleId: props.styleId,
              accessibility: props.accessibility,
            },
          },
        },
      )
    })
  })
})
