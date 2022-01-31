import { Container } from '@zup-it/beagle-backend-components'
import { BeagleJSX, Expression, FC, WithChildren } from '@zup-it/beagle-backend-core'
import { condition } from '@zup-it/beagle-backend-core/operations'
import { Spinner } from '../components/spinner'

interface Props extends WithChildren {
  isLoading: Expression<boolean>,
}

export const Loading: FC<Props> = ({ isLoading, children }) => (
  <>
    <Container style={{
      flex: 1,
      alignContent: 'CENTER',
      justifyContent: 'CENTER',
      display: condition(isLoading, 'FLEX', 'NONE'),
    }}>
      <Spinner/>
    </Container>
    <Container style={{ display: condition(isLoading, 'NONE', 'FLEX') }}>
      {children}
    </Container>
  </>
)
