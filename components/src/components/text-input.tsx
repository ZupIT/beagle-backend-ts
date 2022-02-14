import { BeagleJSX, FC, Expression, Actions, AnyContextNode, createContextNode } from '@zup-it/beagle-backend-core'
import { StyledDefaultComponent, WithStyle } from '../style/styled'
import { WithAccessibility, WithTheme } from '../types'

interface TextInputProps extends WithAccessibility, WithTheme, WithStyle {
  /**
   * The value of the text input, i.e. its content.
   */
  value?: Expression<string>,
  /**
   * The text to show when no value has been typed.
   */
  placeholder?: Expression<string>,
  /**
   * Whether to enable (true) or disable (false) the text input. Defaults to true.
   */
  enabled?: boolean,
  /**
   * When true, the text input is not editable. Defaults to false.
   */
  readOnly?: boolean,
  /**
   * Used for obscuring the content (PASSWORD), validating the entry (system's validation), choosing the appropriate
   * virtual keyboard or showing a system's Date Picker (DATE) in the platforms that support it. Defaults to 'TEXT'.
   */
  type?: Expression<'DATE' | 'EMAIL' | 'NUMBER' | 'PASSWORD' | 'TEXT'>,
  /**
   * The error message for this input's validation. When no validation error exists, null or an empty string can be
   * used. This is normally used with the operation `condition`. Check the example below:
   * ```
   * error={condition(lt(age, 18), 'You must be at least 18 to sign up', null)}
   * ```
   */
  error?: Expression<string | null>,
  /**
   * Whether or not to show validation errors. When this is false, even if `error` is not empty, the error feedback is
   * not shown. This is important because, in most cases, we only want to show the error if the user already interacted
   * with the input. Defaults to false.
   */
  showError?: Expression<boolean>,
  /**
   * An action factory. This function must return the actions to run when the user focus the input. This is a function
   * so Beagle can inject the ContextNode corresponding to the current value of the input, i.e., the single argument
   * received by this function is a context referring to the current content of the input.
   */
  onFocus?: (value: AnyContextNode<string>) => Actions,
  /**
   * An action factory. This function must return the actions to run when the user changes the input's text. This is a
   * function so Beagle can inject the ContextNode corresponding to the current value of the input, i.e., the single
   * argument received by this function is a context referring to the current content of the input.
   */
  onChange?: (value: AnyContextNode<string>) => Actions,
  /**
   * An action factory. This function must return the actions to run when the input loses focus. This is a function
   * so Beagle can inject the ContextNode corresponding to the current value of the input, i.e., the single argument
   * received by this function is a context referring to the current content of the input.
   */
  onBlur?: (value: AnyContextNode<string>) => Actions,
}

interface InputEvent {
  /**
   * The current content of the input.
   */
  value: string,
}

/**
 * Renders a text input. Although none of its properties is required, it will normally be used at least with `value`
 * and `onChange`. The value will be a context variable while the onChange event will update the context variable. See
 * the example below:
 *
 * ```
 * const name = createContext('name', '')
 *
 * const MyScreen = () => (
 *   <Container>
 *     <TextInput placeholder="name" value={name} onChange={value => name.set(value)} />
 *     <Text>{name}</Text>
 *   </Container>
 * )
 * ```
 *
 * The example above is a very silly screen that renders a TextInput and below it a Text with the content typed by the
 * user. The text updates whenever the user changes the input's content.
 *
 * A TextInput is generally used inside a SimpleForm. For a more complex example, check {@link SimpleForm}.
 *
 * @param props {@link TextInputProps}.
 * @returns JSX element, i.e an instance of Component.
 */
export const TextInput: FC<TextInputProps> = ({ id, style, onFocus, onChange, onBlur, ...props }) => {
  const onChangeActions = onChange ? onChange(createContextNode<InputEvent>('onChange').get('value')) : undefined
  const onFocusActions = onFocus ? onFocus(createContextNode<InputEvent>('onFocus').get('value')) : undefined
  const onBlurActions = onBlur ? onBlur(createContextNode<InputEvent>('onBlur').get('value')) : undefined
  const properties = { ...props, onChange: onChangeActions, onFocus: onFocusActions, onBlur: onBlurActions }
  return <StyledDefaultComponent name="textInput" id={id} style={style} properties={properties} />
}
