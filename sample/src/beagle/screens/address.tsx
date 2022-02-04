import { Button, Container, ScreenComponent, Text, TextInput } from '@zup-it/beagle-backend-components'
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { Address as AddressData } from 'sample/src/models/product'
import { getAddresByCep } from '../network/address'

export const Address: Screen = ({ navigator }) => {
  const address = createContext<AddressData>('products', { cep: '', street: '', state: '', number: '', city: '' })

  return (
    <ScreenComponent safeArea={true} navigationBar={{ title: 'Address', showBackButton: true }}>
      <Container context={address} style={{flexDirection: 'COLUMN', justifyContent: 'SPACE_BETWEEN'}}>
        <Container
          style={{
            flexDirection: 'COLUMN',
            width: { value: 100, type: 'PERCENT'},
            padding: 10,
          }}
        >
          <Text style={{
            paddingBottom: 5
          }}>
            CEP
          </Text>
          <TextInput
            value={address.get('cep')}
            onChange={(value) => address.get('cep').set(value)}
            onBlur={(value) => [
              getAddresByCep(value, {
                onSuccess: response => [
                  address.get('street').set(response.get('data').get('logradouro')),
                  address.get('city').set(response.get('data').get('localidade')),
                  address.get('state').set(response.get('data').get('uf')),
                ],
              })
            ]}
          />
        </Container>

        <Container
          style={{
            flexDirection: 'ROW',
            justifyContent: 'SPACE_BETWEEN',
            width: { value: 100, type: 'PERCENT'},
            padding: 10,
          }}
        >
          <Container
            style={{
              flexDirection: 'COLUMN',
              width: { value: 60, type: 'PERCENT'},
            }}
          >
            <Text style={{
              paddingBottom: 5
            }}>
              Street
            </Text>
            <TextInput
              value={address.get('street')}
              onChange={(value) => address.get('street').set(value)}
            />
          </Container>
          <Container
            style={{
              flexDirection: 'COLUMN',
              width: { value: 35, type: 'PERCENT'},
            }}
          >
            <Text style={{
              paddingBottom: 5
            }}>
              Number
            </Text>
            <TextInput
              value={address.get('number')}
              onChange={(value) => address.get('number').set(value)}
            />
          </Container>
        </Container>

        <Container
          style={{
            flexDirection: 'ROW',
            justifyContent: 'SPACE_BETWEEN',
            width: { value: 100, type: 'PERCENT'},
            padding: 10,
          }}
        >
          <Container
            style={{
              flexDirection: 'COLUMN',
              width: { value: 60, type: 'PERCENT'},
            }}
          >
            <Text style={{
              paddingBottom: 5
            }}>
              City
            </Text>
            <TextInput
              value={address.get('city')}
              onChange={(value) => address.get('city').set(value)}
            />
          </Container>
          <Container
            style={{
              flexDirection: 'COLUMN',
              width: { value: 35, type: 'PERCENT'},
            }}
          >
            <Text style={{
              paddingBottom: 5
            }}>
              UF
            </Text>
            <TextInput
              value={address.get('state')}
              onChange={(value) => address.get('state').set(value)}
            />
          </Container>
        </Container>
        <Container style={{
          flexDirection: 'ROW',
          justifyContent: 'FLEX_END',
          width: {
            value: 100,
            type: 'PERCENT'
          },
          padding: 10,
        }}>
          <Button enabled={true} >
            Next
          </Button>
        </Container>
      </Container>
    </ScreenComponent>
  )
}
