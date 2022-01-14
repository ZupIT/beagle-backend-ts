import { BeagleJSX } from '../jsx'
import { Component, FC } from '@zup-it/beagle-backend-core'
import { Container, Text } from '.'

interface FragmentProps {
  children?: string | Component | Component[] | undefined
}

export const Fragment: FC<FragmentProps> = ({ children }) => {
  if (typeof children === 'string') return <Container><Text>{children}</Text></Container>
  return <Container>{children ?? []}</Container>
}
