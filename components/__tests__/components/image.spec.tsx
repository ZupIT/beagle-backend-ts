import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Image, ImageProps } from '../../src/components/image'
import { StyledComponentMock } from '../__mocks__/styled-component'
import { expectComponentToBeCorrect } from './utils'

jest.mock('src/style/styled', () => ({
  __esModule: true,
  StyledComponent: (_: any) => StyledComponentMock(_),
  StyledDefaultComponent: (_: any) => StyledComponentMock(_),
}))

describe('Components', () => {
  describe('ImageComponent', () => {
    const name = 'image'
    const id = 'test-image'

    const props: ImageProps = {
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
      mobileId: 'image-mobile-id',
    }

    describe('Remote Image', () => {
      it('should create component', () => {
        expectComponentToBeCorrect(
          <Image
            id={id}
            type="remote"
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
              style: props.style,
              path: {
                '_beagleImagePath_': 'remote',
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
        expectComponentToBeCorrect(
          <Image
            id={id}
            type="local"
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
              style: props.style,
              path: {
                '_beagleImagePath_': 'local',
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
      expectComponentToBeCorrect(
        <Image
          id={id}
          type="local"
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
            style: props.style,
            path: {
              '_beagleImagePath_': 'local',
              mobileId: props.mobileId,
              styleId: props.styleId,
              accessibility: props.accessibility,
            },
          },
        },
      )
    })

    describe('Local Web & Mobile Image', () => {
      expectComponentToBeCorrect(
        <Image
          id={id}
          type="local"
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
            style: props.style,
            path: {
              '_beagleImagePath_': 'local',
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
