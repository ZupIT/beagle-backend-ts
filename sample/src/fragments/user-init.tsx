import { Container, Text } from '@zup-it/beagle-backend-components'
import { React, FC } from '@zup-it/beagle-backend-core'
import { alert, condition as conditionalAction } from '@zup-it/beagle-backend-core/actions/index'
import { isNull, condition } from '@zup-it/beagle-backend-core/operations/index'
import { globalContext } from '../global-context'
import { getUserById } from '../network/user'

export const UserInit: FC<{ id: string }> = ({ id, children }) => {
  const user = globalContext.get('user')

  const initializeUser = getUserById(id, {
    onSuccess: success => globalContext.get('user').set(success.get('data')),
    onError: error => alert(error.get('message')),
  })

  const conditionalInit = conditionalAction({ condition: isNull(user), onTrue: initializeUser })

  return (
    <Container id="userInit" onInit={conditionalInit}>
      <Text text="loading..." style={{ display: condition(isNull(user), 'FLEX', 'NONE') }} />
      <Container style={{ display: condition(isNull(user), 'NONE', 'FLEX') }}>
        {children}
      </Container>
    </Container>
  )
}
