import { createStyleMap } from '@zup-it/beagle-backend-components'

export const style = createStyleMap({
  page: {
    padding: 10,
    alignItems: 'CENTER',
    width: '100%',
  },
  contentBox: {
    alignItems: 'CENTER',
    marginVertical: 20,
  },
  productImage: {
    width: 260,
    height: 260,
  },
  price: {
    marginVertical: 30,
  },
  inCart: {
    flexDirection: 'ROW',
    justifyContent: 'CENTER',
    alignItems: 'CENTER',
    marginBottom: 20,
  },
  checkImage: {
    width: 20,
    height: 20,
    marginLeft: 6,
  }
})
