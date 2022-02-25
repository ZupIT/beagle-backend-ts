# Navigation

## Contents
1. [Introduction](#introduction)
1. [Native navigation](#native-navigation)
1. [Web navigation](#web-navigation)
1. [Local navigation](#local-navigation)
1. [Remote navigation](#remote-navigation)
1. [Keep reading](#keep-reading)

## Introduction
Navigations are [Beagle Actions](/actions), but we feel it needs its own dedicated topic.

A navigation in beagle can be of 4 types:
- Native: changes the current named route in the frontend app.
- Web: opens the browser with the given URL.
- Local: navigates to a Beagle screen that has been declared inline in the JSON.
- Remote: navigates to the Beagle screen pointed by the given URL.

## Native navigation
To make a native navigation, use the action [`openNativeRoute`](todo) and pass the name of the route in the frontend you
want to navigate to. Example:

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { openNativeRoute } from '@zup-it/beagle-backend-core/actions'
import { Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

export const MyScreen: Screen = () => (
  <Button onPress={openNativeRoute({ route: 'product', data: { id: '1' } })}>
    Check the details of the product with id 1
  </Button>
)
```

To open a native route, we need to pass the route name in the frontend and, optionally, some data to pass to this route.
In the example above we open the native route named "product" and we pass "id: 1" as a parameter.

## Web navigation
To open a web page in the system's browser, use the action [`openExternalUrl`](todo) and pass the page's URL. Example:

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { openExternalUrl } from '@zup-it/beagle-backend-core/actions'
import { Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

export const MyScreen: Screen = () => (
  <Button onPress={openExternalUrl('https://www.google.com')}>
    Open Google
  </Button>
)
```

`openExternalUrl` has 2 signatures (overload): you can either pass the URL as the first argument or an object
containing both the URL and analytics options.

## Local navigation
Local and Remote navigations are very similar, they all use the same actions. The only difference is that local
navigations specify the new screen in the body of the action (inline), while remote navigations only specifies a URL
to the new screen.

Example of a local navigation:
```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { pushView, popView } from '@zup-it/beagle-backend-core/actions'
import { Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

const navigateToLocalRoute = pushView({
  route: {
    screen: (
      <Container id="my-local-route">
        <>Hello from the local route!</>
        <Button onPress={popView()}>Go back</Button>
      </Container>
    )
  }
})

export const MyScreen: Screen = () => <Button onPress={navigateToLocalRoute}>Open Local Route</Button>
```

Above, we pass a component tree to the property `screen`. This is the screen that will be rendered when the user
performs the navigation. Since we need to name every screen in the frontend and there's no URL to this, an id must be
given to the root component, it will be used as the screen identifier.

Although we only used `route` in this example, a local navigation can also have [`analytics`](/analytics) and
[`navigationContext`](todo).

A local screen can be created with any of these actions: `pushStack`, `pushView`, `resetStack`, `resetApplication`.

## Remote navigation
Remote navigations work just like local navigations, but instead of providing an object with a screen
([`LocalView`](todo)) to the property `route`, we need to provide an object of type [`RemoteView`](todo).

A RemoteView must contain a URL to the screen we want to navigate to, the other parameters are optional:

- url: the URL of the screen in the backend.
- shouldPrefetch: optional. When true, it fetches the screen as soon as possible, so there's no wait time when the
navigation actually happens.
- fallback: optional. A component tree to show in case the navigation fails to fetch the screen.
- httpAdditionalData: optional. Further configuration for the request: method (`get` by default), headers and body.
- navigationContext: optional. A [Navigation Context](todo) for this navigation.

See the example below of how to make a remote navigation:

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { pushView, popView } from '@zup-it/beagle-backend-core/actions'
import { Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

const navigateToShoppingCart = pushView({
  route: {
    url: '/shopping-cart',
    fallback: <>Oops! Could load the screen you requested</>
  }
})

export const MyScreen: Screen = () => <Button onPress={navigateToShoppingCart}>Go to shopping cart</Button>
```

Above, we created a button that, when pressed, fetches the screen at `$backendUrl/shopping-cart` and navigates to it. If
the fetch fails, it replaces the current screen with an error message.

## Push, pop and reset
The Beagle navigation structure is a stack of stacks of screen. Imagine an app with a bottom navigator and the sections
"Home", "Products", "Shopping Cart" and "Account". Each of these menus could be a stack in the navigator and each
page on each menu would be a screen inside a stack. If you don't need this structure, you can just always use the
first stack.

Both local and remote navigations can be pushes, pops or resets. All previous examples used the action `pushView` and
`popView`, but we could have used any of the navigation actions for beagle screens:

- **[`pushView`](todo)**: adds the screen to the current navigation stack. If no navigation stack exists yet, it creates
one.
- **[`pushStack`](todo)**: adds the screen to a new navigation stack.
- **[`popView`](todo)**: removes the screen at the top of the current stack, effectively going back to the previous
screen.
- **[`popToView`](todo)**: removes every screen until the screen identifier (url or id) provided is found, effectively
going back to the screen identified by the string passed as parameter. If the screen is not found, nothing happens.
- **[`popStack`](todo)**: removes the current stack, effectively going back to the last screen of the last stack.
- **[`resetStack`](todo)**: replaces the current stack with a new stack that starts with the screen passed as parameter.
- **[`resetApplication`](todo)**: replaces all stacks with a new stack that starts with the screen passed as parameter.

> Important: if you're using the module `@zup-it/beagle-backend-express`, for remote navigations, prefer using the
[`Navigator`](#the-navigator) instead of these actions directly.

## The Navigator
When using the Beagle Backend TS with Express (`@zup-it/beagle-backend-express`) you shouldn't use the navigation
actions directly to make remote navigations. Instead, you should use the [`Navigator`](todo), which is type-safe way of
making navigations.

Each screen receives the Navigator as one of its properties and the Navigator has every method listed in the previous
section. The only difference is that instead of dealing with strings, it uses the screens themselves to make a
navigation. This ensures we never use an incorrect URL or try to navigate to a screen that doesn't exist. Furthermore,
the Navigator ensures that everything expected by a screen is correctly passed when we try to navigate to it.

The example below shows two screens: the first is a page that displays the details of a product. The product is expected
to be passed in the [navigation context](todo). The second is a screen with 3 buttons representing each one a product.
When the button is pressed, it navigates to the screen that shows its details.

`product.tsx`
```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { Product } from '../model/product' // no need to show this interface to explain this topic

interface ProductScreenRequest extends ScreenRequest {
  navigationContext: {
    product: Product,
  }
}

export const ProductScreen: Screen<ProductScreenRequest> = ({ navigationContext }) => (
  <>
    <>{navigationContext.get('product').get('name')}</>
    <>{navigationContext.get('product').get('description')}</>
    <>{navigationContext.get('product').get('price')}</>
  </>
)
```

`product-list.tsx`
```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { Product } from '../model/product' // no need to show this interface to explain this topic
import { ProductScreen } from './product'

const products: Product[] = [] // suppose we declared 3 products here

export const ProductListScreen: Screen = ({ navigator }) => (
  <>
    <Button onPress={navigator.pushView(ProductScreen, { navigationContext: products[0] })}>Product 1</Button>
    <Button onPress={navigator.pushView(ProductScreen, { navigationContext: products[1] })}>Product 2</Button>
    <Button onPress={navigator.pushView(ProductScreen, { navigationContext: products[2] })}>Product 3</Button>
  </>
)
```

Notice that we imported the screen from the file we declared it and when navigating to it, we specified the product
it expects in the navigation context. If we hadn't passed the product, this code wouldn't compile, because when we
created the `ProductScreen`, we said it needed a navigation context with a product.

## The ControllerId
Some aspects of the navigation like how to show the loading feedback, the animations and the error treatment can be
customized with Navigation Controllers in the frontend (check the documentation for your frontend lib to know more
details about this).

Each navigation stack is associated to a Navigation Controller, which can be identified by an id. When changing the
current stack (`pushStack`, `resetStack` and `resetApplication`), the Navigation Controller of the new stack can be
customized by passing the property `controllerId`.

## Keep reading
**Next topic: [Making requests](/making-requests)**
