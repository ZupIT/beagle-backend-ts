import { WithStyle, StyledComponent } from '@zup-it/beagle-backend-components'
import { BeagleJSX, FC } from '@zup-it/beagle-backend-core'

export const Spinner: FC<WithStyle> = ({ id, style }) => <StyledComponent id={id} name="spinner" style={style} />
