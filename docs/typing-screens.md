# Giving a type to your screens
In Typescript, is is always recommended to give a type to your variables. Screens, should always use the type `Screen`.
See the example below.

Instead of writing:
```typescript
const MyScreen = () => <>Hello from my first screen!</>
```

prefer:
```typescript
import { Screen } from '@zup-it/beagle-backend-express'

const MyScreen: Screen = () => <>Hello from my first screen!</>
```

## The ScreenRequest type
The type `Screen` is generic, by default it will be a `Screen` of `ScreenRequest`, which means a screen will always
receive as parameter the following data:

- request: the request object from express used to request this page. Use this to get the request headers, route
parameters, query, body, etc.
- response: the response object from express for the current response. Use this to alter the status code of the
response, headers, etc.
- navigationContext: a reference to the current navigation context. Read the topic ["Context"](todo) to know more about
this.
- navigator: an instance of the class Navigator, which is a type-safe way of navigating from a screen to another. Always
prefer using the navigator instead of the navigation actions directly from the backend-ts core. To know more about
navigation, check [this topic](todo).

With these properties injected to your screen you can get lots of information from the request and also alter the
response! But which route params should the screen expect? What about the query params? And what's the type of the
body anyway?

If your screen expects anything specific in the request, you should type it accordingly. Take as example a screen
that shows a product with a given id. One way of receiving this id is through the url, to do so, extend the type
`ScreenRequest` and set it as the generic value for `Screen`. See the example below:

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'

interface ProductRequest extends ScreenRequest {
  routeParams: {
    id: string,
  }
}

const ProductScreen: Screen<ProductRequest> = ({ request }) => <>The product id is: {request.params.id}</>
```

And when registering the screen, don't forget to express that the route accepts the id as parameter:

```typescript
// ...
import { RouteMap } from '@zup-it/beagle-backend-express'
import { ProductScreen } from './product'

export const routes: RouteMap = {
  // ...
  '/product/:id': ProductScreen,
}
```

In the example above we typed the route parameters, but we can type any part of the request! Check the example below:

```tsx
interface MyScreenRequest extends ScreenRequest {
  routeParams: {
    param1: string,
    param2: string,
  },
  query?: {
    queryParam1?: string,
    queryParam2?: string,
  },
  headers: {
    'my-custom-header': string,
  },
  body: {
    attribute1: number,
    attribute2: boolean,
    attribute3: {
      attribute4: string,
    }
  },
  navigationContext: {
    previousPageData: {
      data1: string,
      data2?: number,
    }
  }
}

const MyScreen: Screen<ProductRequest> = ({ request, navigationContext }) => (
  <>
    <>{request.params.param1}</>
    <>{request.params.param2}</>
    <>{request.query?.queryParam1 ?? ''}</>
    <>{request.query?.queryParam2 ?? ''}</>
    <>{request.body.attribute1}</>
    <>{request.body.attribute2}</>
    <>{request.body.attribute3.attribute4}</>
    <>{navigationContext.previousPageData.data1}</>
    <>{navigationContext.previousPageData.data2 ?? 0}</>
  </>
)
```

This example doesn't represent any real use-case scenario, it is just to show how we can type every aspect of the
request. This is very important so, inside the screen function, we can access only what actually exists. It is also
important to guarantee that any navigation to this screen won't miss any of the required parameters.

## Keep reading
**Next topic: [Components](/components)**
