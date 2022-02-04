import { colors, Container } from '@zup-it/beagle-backend-components'
import { BeagleJSX, Expression, FC, WithChildren } from '@zup-it/beagle-backend-core'
import { condition } from '@zup-it/beagle-backend-core/operations'
import { Spinner } from '../components/spinner'

interface Props extends WithChildren {
  isLoading: Expression<boolean>,
}

export const Loading: FC<Props> = ({ isLoading, children }) => (
  <>
    <Spinner style={{ display: condition(isLoading, 'FLEX', 'NONE'), height: '100%' }} />
    <Container style={{ display: condition(isLoading, 'NONE', 'FLEX') }}>
      {children}
    </Container>
  </>
)
