export interface WithAccessibility {
  accessibility?: {
    /**
     * Whether this component has accessibility capabilities or not.
     */
    accessible: boolean,
    /**
     * Message that will be spoken by softwares like VoiceOver.
     */
    accessibilityLabel?: string,
    /**
     * When true, the accessibility software will interpret this as a header.
     *
     * @defaultValue `false`
     */
    isHeader?: boolean,
  },
}

export interface WithTheme {
  /**
   * The identifier of the frontend theme to use for this text input.
   *
   * - Web: equivalent to class.
   * - Android and iOS: this theme is set by the DesignSystem class.
   * - Flutter: this theme is set by the BeagleTheme class.
   */
  styleId?: string,
}
