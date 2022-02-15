import { colors, createStyleMap } from '@zup-it/beagle-backend-components'

export const style = createStyleMap({
  item: {
    flexDirection: 'ROW',
    alignItems: 'CENTER',
    padding: 10,
    marginVertical: 10,
    borderColor: colors.lightgray,
    borderWidth: 1,
    backgroundColor: colors.white,
    cornerRadius: 8,
  },
  Address: {
    justifyContent: 'SPACE_BETWEEN',
    padding: 10,
    marginVertical: 10,
    borderColor: colors.lightgray,
    borderWidth: 1,
    backgroundColor: colors.white,
    cornerRadius: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  title: {
    flex: 1,
    marginRight: 15,
  },
  container: {
    flexDirection: 'ROW',
    justifyContent: 'SPACE_BETWEEN'
  },
})
