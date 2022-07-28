import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { colors, Container, ListView, Template, Text, Touchable } from '@zup-it/beagle-backend-components'
import { condition } from '@zup-it/beagle-backend-core/operations'
import { selectElementWithId } from '../../operations'

const items = [
  { id: '001', name: 'George', age: 32, selected: false },
  { id: '003', name: 'Joana', age: 28, selected: false },
  { id: '006', name: 'Philip', age: 45, selected: false },
  { id: '025', name: 'Marianne', age: 62, selected: false },
]

export const Welcome: Screen = () => {
  const people = createContext('people', items)
  return (
    <Container context={people}>
      <ListView key="id" dataSource={people} style={{ borderColor: colors.black, padding: 10, borderWidth: 1 }}>
        {(item) => (
          <Template>
            <Touchable onPress={people.set(selectElementWithId(people, item.get('id')))}>
              <Container style={{
                padding: 10,
                borderColor: colors.black,
                backgroundColor: condition(item.get('selected'), colors.aliceblue, colors.white)
              }}>
                <Text>Name: {item.get('name')}</Text>
                <Text>Age: {item.get('age')}</Text>
              </Container>
            </Touchable>
          </Template>
        )}
      </ListView>
      <ListView key="id" dataSource={people} style={{ borderColor: colors.black, padding: 10, borderWidth: 1 }}>
        {(item) => (
          <Template>
            <Container style={{
              padding: 10,
              borderColor: colors.black,
              backgroundColor: condition(item.get('selected'), colors.aliceblue, colors.white)
            }}>
              <Text>Name: {item.get('name')}</Text>
              <Text>Age: {item.get('age')}</Text>
            </Container>
          </Template>
        )}
      </ListView>
    </Container>
  )
}
