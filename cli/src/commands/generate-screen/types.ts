export interface GenerateScreenOptions {
  /**
   * The screen will have parameters on the url.
   */
  withRouteParams: boolean,
  /**
   * The screen will have headers to be sent in the request.
   */
  withHeaders: boolean,
  /**
   * The screen will have a request body. Invalid for "GET" requests.
   */
  withBody: boolean,
  /**
   * The screen will have properties in the urls query.
   */
  withQuery: boolean,
  /**
   * The screen will have properties to be set in the navigation context.
   */
  withNavigationContext: boolean,
  /**
   * A Context that will be made available for this Screen and its children.
   */
  withContext: boolean,
   /**
   * The children of this Screen.
   */
  withChildren: boolean,
  /**
   * The Screen will support accessibility properties.
   */
  withAccessibility: boolean,
   /**
   * The Screen will support analytics.
   */
  withAnalytics: boolean,
  /**
   * The style for this Screen. Use it to customize the background, layout, borders, etc.
   */
  withStyle: boolean,
}
