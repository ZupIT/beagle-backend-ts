import { setFragmentFactory } from '@zup-it/beagle-backend-core'
import { Fragment } from './components/fragment'

export { Color, colors } from './color'
export * from './components'
export { StyledComponent } from './style/styled'
export { SimpleStyle as Style } from './style/simple-styles'
export { submitForm } from './actions/submit-form'

setFragmentFactory((children) => Fragment({ children}))
