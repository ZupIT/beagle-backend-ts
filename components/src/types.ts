export interface WithAccessibility {
  accessibility?: {
    accessible?: boolean,
    accessibilityLabel?: string,
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
