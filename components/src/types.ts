export interface WithAccessibility {
  accessibility?: {
    accessible?: boolean,
    accessibilityLabel?: string,
    isHeader?: boolean,
  },
}

export interface WithTheme {
  styleId?: string,
}
