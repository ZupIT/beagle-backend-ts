import { Container, Text, Button, ListView } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions/index'
import { Template } from '../../../components/src/components/dynamic-list'

interface Character {
  name: string,
  book: string,
  age: number,
  date: { year: number, month: number, day: number },
  author: string
}

const characters: Character[] = []

export const Test: Screen = () => (
  <ListView dataSource={characters}>
    {(item) => <Template><Text>{item.get('author')}</Text></Template>}
  </ListView>
)
