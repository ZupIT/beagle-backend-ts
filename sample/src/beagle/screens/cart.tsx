import { Button, Container, ListView, ScreenComponent, Template, Text } from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { globalContext } from '../global-context'
import { formatPrice } from '../operations'
import { Address } from './address'

export const Cart: Screen = ({ navigator }) => {
  const cart = globalContext.get('cart')
  return (
    <ScreenComponent safeArea={true} navigationBar={{ title: 'Cart', showBackButton: true }}>
      <Container context={cart} style={{
        flexDirection: 'COLUMN',
        justifyContent: 'SPACE_BETWEEN'
      }}>
        <ListView dataSource={cart} key='id' style={{
          height: {
            value: 75,
            type: 'PERCENT'
          }
        }}>
          {(item) => (
            <Template>
              <Container style={{
                flexDirection: 'ROW',
                alignItems: 'CENTER',
                justifyContent: 'SPACE_BETWEEN',
                padding: {
                  value: 10,
                  type: 'REAL'
                },
                marginHorizontal: {
                  value: 10,
                  type: 'REAL'
                },
                marginVertical: {
                  value: 5,
                  type: 'REAL'
                },
                borderColor: '#000000',
                borderWidth: 1
              }}>
                <Text style={{
                    width: {
                      value: 60,
                      type: 'PERCENT',
                    },
                }}>
                  {item.get('title')}
                </Text>

                <Text style={{
                    width: {
                      value: 30,
                      type: 'PERCENT',

                    }
                }}>
                  {formatPrice(item.get('price'), 'BRL')}
                </Text>
              </Container>
            </Template>
          )}
        </ListView>
        <Container style={{
          flexDirection: 'ROW',
          padding: {
            value: 5,
            type: 'PERCENT'
          },
          alignItems: 'CENTER',
          justifyContent: 'SPACE_BETWEEN',
          width: {
            value: 100,
            type: 'PERCENT'
          }
        }}>
          <Container style={{
            flexDirection: 'COLUMN',
          }}>
            <Text>
              Total
            </Text>
            <Text>
              { /*TODO create operation that calculates cart total*/ }
              2500
            </Text>
          </Container>

          <Button enabled={true} onPress={navigator.pushView(Address)}>
            Next
          </Button>
        </Container>
      </Container>
    </ScreenComponent>
  )
}
