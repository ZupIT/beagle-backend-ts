import { BeagleJSX, Component, FC } from '@zup-it/beagle-backend-core'
import { Container, Text } from '.'

interface FragmentProps {
  children?: string | Component[] | undefined
}

export const Fragment: FC<FragmentProps> = ({ children }) => {
  if (typeof children === 'string') return <Container><Text text={children} /></Container>
  return (
    <Container>{children ?? []}</Container>
  )
}
