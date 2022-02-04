import { Container, Image, Text } from '@zup-it/beagle-backend-components'
import { Actions, BeagleJSX, Expression, FC, WithChildren } from '@zup-it/beagle-backend-core'

interface Props {
  productId: Expression<number>,
  image: Expression<string>,
  title: Expression<string>,
  price: Expression<string>,
}

export const CartProduct: FC<Props> = ({ id, image, title, price }) => (
  <Container style={{
    // flex: 1,
    flexDirection: 'ROW',
    alignContent: 'CENTER',
    width: {
      value: 100,
      type: 'PERCENT'
    }
  }}>
    {/* <Image type='remote' path={{ url: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png', placeholder: { url: '' } }}/> */}
    <Container style={{
      flexDirection: 'ROW',
      alignContent: 'CENTER',
      justifyContent: 'SPACE_BETWEEN',
    }}>
      <Text
        style={{
          width: {
            value: 30,
            type: 'PERCENT',
          }
        }}
      >
        {title}
      </Text>

      {/* <Text
        style={{
          width: {
            value: 30,
            type: 'PERCENT',
          }
        }}
      >
        {price}
      </Text> */}
    </Container>
  </Container>
)
