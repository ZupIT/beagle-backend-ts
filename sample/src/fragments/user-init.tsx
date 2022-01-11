import { Container, Text } from '@zup-it/beagle-backend-components'
import { React, FC } from '@zup-it/beagle-backend-core'
import { alert, condition as conditionalAction } from '@zup-it/beagle-backend-core/actions'
import { isNull, condition } from '@zup-it/beagle-backend-core/operations'
import { app } from '..'
import { getUserById } from '../network/user'

export const UserInit: FC<{ id: string }> = ({ id, children }) => {
  const user = app.globalContext.get('user')

  const initializeUser = getUserById(id, {
    onSuccess: success => app.globalContext.get('user').set(success.get('data')),
    onError: error => alert(error.get('message')),
  })

  const conditionalInit = conditionalAction({ condition: isNull(user), onTrue: initializeUser })

  return (
    <Container onInit={conditionalInit}>
      <Text text="loading..." style={{ display: condition(isNull(user), 'FLEX', 'NONE') }} />
      <Container style={{ display: condition(isNull(user), 'NONE', 'FLEX') }}>
        {children}
      </Container>
    </Container>
  )
}
