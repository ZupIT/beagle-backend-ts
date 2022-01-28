import { Container, Text } from '@zup-it/beagle-backend-components'
import { BeagleJSX, FC, WithChildren } from '@zup-it/beagle-backend-core'
import { alert, condition as conditionalAction } from '@zup-it/beagle-backend-core/actions'
import { isNull, condition } from '@zup-it/beagle-backend-core/operations'
import { globalContext } from '../global-context'
import { getUserById } from '../network/user'

interface UserInitProps extends Required<WithChildren> {
  userId: string,
}

export const UserInit: FC<UserInitProps> = ({ children, userId }) => {
  const user = globalContext.get('user')

  const initializeUser = getUserById(userId, {
    onSuccess: success => globalContext.get('user').set(success.get('data')),
    onError: error => alert(error.get('message')),
  })

  const conditionalInit = conditionalAction({ condition: isNull(user), onTrue: initializeUser })

  return (
    <Container onInit={conditionalInit}>
      <Text style={{ display: condition(isNull(user), 'FLEX', 'NONE') }}>loading...</Text>
      <Container style={{ display: condition(isNull(user), 'NONE', 'FLEX') }}>
        {children}
      </Container>
    </Container>
  )
}
