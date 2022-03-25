import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { PageIndicator, PageIndicatorProps } from '../../src/components/page-indicator'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('PageIndicator', () => {
    const name = 'pageIndicator'
    const id = 'test-page-indicator'
    const properties: PageIndicatorProps = {
      selectedColor: '#32b40a',
      unselectedColor: '#cf6807',
      numberOfPages: 10,
      currentPage: 3,
    }

    it('should create component', () => {
      expectComponentToBeCorrect(
        <PageIndicator
          id={id}
          selectedColor={properties.selectedColor}
          unselectedColor={properties.unselectedColor}
          numberOfPages={properties.numberOfPages}
          currentPage={properties.currentPage}
        />,
        name,
        { id, properties },
      )
    })

    describe('Validation', () => {
      describe('Colors', () => {
        it('should throw when selectedColor is not valid', () => {
          expect(() => <PageIndicator selectedColor="#test123" unselectedColor="#cf6807" />).toThrowError()
        })

        it('should throw when unselectedColor is not valid', () => {
          expect(() => <PageIndicator selectedColor="#32b40a" unselectedColor="#test987" />).toThrowError()
        })
      })
    })
  })
})
