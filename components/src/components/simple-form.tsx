import { BeagleJSX, FC, Actions, WithChildren } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface SimpleFormProps extends WithAccessibility, WithTheme, WithStyle, Required<WithChildren> {
  /**
   * Actions to run when the form is submitted (submitForm action). These actions are not run if a TextInput, inside
   * the form, has a validation error, i.e. if the property `error` resolves to true.
   */
  ​onSubmit: Actions,
  /**
   * Actions to run when the user tries to submit the form, but validation errors are found.
   */
  onValidationError?: Actions,
}

/**
 * A Form. Design-wise, it looks the same as a Container. The difference is that it can be validated and submitted.
 * To submit a form, use the action `submitForm`.
 *
 * Example:
 * ```
 * interface Address {
 *   zip: string,
 *   number: string,
 *   reference?: string,
 * }
 *
 * const address = createContext<Address>('address')
 * const errors = createContext('errors', {
 *   showAll: false,
 *   show: {
 *     zip: false,
 *     reference?: false,
 *   }
 * })
 *
 * const postAddress = sendRequest({
 *   url: 'https://myapi.com/address'
 *   method: 'post',
 *   data: address,
 *   onSuccess: () => alert('Address registered!'),
 *   onError: () => alert('Unexpected error.'),
 * })
 *
 * const MyScreen = () => (
 *   <Container context={address}>
 *     <SimpleForm context={errors} onSubmit={postAddress} onValidationError={errors.get('showAll').set(true)}>
 *       <TextInput
 *         placeholder="Zip code (required)"
 *         value={address.get('zip')}
 *         onChange={address.get('zip').set}
 *         onBlur={errors.get('show').get('zip').set(true)}
 *         error={condition(isEmpty(address.get('zip')), 'This field is required', null)}
 *         showError={or(errors.get('showAll'), errors.get('show').get('zip'))}
 *       />
 *       <TextInput
 *         placeholder="Address reference"
 *         value={address.get('reference')}
 *         onChange={address.get('reference').set}
 *       />
 *       <Button onPress={submitForm()}>Submit</Button>
 *     </SimpleForm>
 *   </Container>
 * )
 * ```
 *
 * The example above creates a simplified address form with two fields: zip and reference. The first is required and we
 * validate the user entry. The second is optional. We show the validation errors only if the user interacted with the
 * field or tried to submit the form. The submission only goes through if no field has errors.
 *
 * @param props {@link SimpleFormProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const SimpleForm: FC<SimpleFormProps> = ({ id, style, children, ...props }) => (
  <StyledDefaultComponent name="simpleForm" id={id} style={style} properties={props}>
    {children}
  </StyledDefaultComponent>
)
