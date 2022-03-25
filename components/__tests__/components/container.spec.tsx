import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { setContext } from '@zup-it/beagle-backend-core/actions/set-context'
import { Button } from '../../src/components/button'
import { Container, ContainerProps } from '../../src/components/container'
import { Text } from '../../src/components/text'
import { expectComponentToBeCorrect } from './utils'

describe('Components', () => {
  describe('Container', () => {
    const name = 'container'
    const id = 'test-container'
    const properties: Partial<ContainerProps> = {
      onInit: setContext({ contextId: 'test-context', value: 'test value' }),
    }

    it('should create component', () => {
      expectComponentToBeCorrect(<Container id={id} onInit={properties.onInit}></Container>, name, { id, properties })
    })

    describe('Children', () => {
      it('should create component', () => {
        const children = [<Text>This is the children test case.</Text>, <Button>Click me</Button>]
        expectComponentToBeCorrect(<Container id={id}>{children}</Container>, name, { id, children })
      })
    })
  })
})
