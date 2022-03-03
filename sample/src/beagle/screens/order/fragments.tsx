import { Container, Text, WithStyle } from '@zup-it/beagle-backend-components'
import { BeagleJSX, Expression, FC, WithChildren } from '@zup-it/beagle-backend-core'
import { theme } from '../../constants'
import { style } from './style'

interface DefinitionItemProps extends WithStyle {
  title: Expression<string>,
  definition: Expression<string>,
}

interface SectionProps extends WithChildren {
  title?: string
}

export const DefinitionItem: FC<DefinitionItemProps> = ({ title, definition, style: titleStyle }) => (
  <Container style={style.definitionItem}>
    <Text styleId={theme.text.bold} style={titleStyle}>{title}</Text>
    <Text>{definition}</Text>
  </Container>
)

export const Section: FC<SectionProps> = ({ title, children }) => {
  const card = <Container style={style.card}>{children}</Container>
  return title ? (
    <>
      <Text alignment="CENTER" styleId={theme.text.h4} style={style.sectionTitle}>{title}</Text>
      {card}
    </>
  ) : card
}
