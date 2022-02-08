import { colors, createStyleMap } from '@zup-it/beagle-backend-components'
import { theme } from '../../constants'

export const style = createStyleMap({
  page: {
    flexDirection: 'COLUMN',
    justifyContent: 'SPACE_BETWEEN',
    backgroundColor: theme.viewBackground,
  },
  emptyCart: {
    flex: 1,
    paddingHorizontal: '15%',
    justifyContent: 'CENTER',
    alignItems: 'CENTER'
  },
  list: {
    flex: 1,
    paddingHorizontal: 15,
  },
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
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  title: {
    flex: 1,
    marginRight: 15,
  },
  summaryBox: {
    flexDirection: 'ROW',
    padding: 10,
    alignItems: 'CENTER',
    justifyContent: 'SPACE_BETWEEN',
    width: '100%',
    backgroundColor: colors.white,
  },
  total: {
    flexDirection: 'COLUMN',
  },
})
