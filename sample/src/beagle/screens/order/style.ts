import { colors, createStyleMap } from '@zup-it/beagle-backend-components'
import { theme } from '../../../beagle/constants'

export const style = createStyleMap({
  page: {
    backgroundColor: theme.viewBackground,
    paddingVertical: 20,
  },
  sectionTitle: {
    marginVertical: 12,
  },
  card: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    borderColor: colors.lightgray,
    borderWidth: 1,
    cornerRadius: 8,
  },
  definitionItem: {
    flexDirection: 'ROW',
    justifyContent: 'SPACE_BETWEEN',
    paddingVertical: 5,
  },
  productTitle: {
    width: '70%',
  },
})
