# Making requests

## Contents

1. [Introduction](#introduction)
1. [Using the sendRequest action](#using-the-sendrequest-action)
1. [Composing requests](#composing-requests)
1. [Keep reading](#keep-reading)

## Introduction
To make requests in Beagle, we use the [Beagle Action](/actions) `sendRequest`, but, instead of explaining it with the
other actions, we feel it needs its own dedicated topic.

To make requests to REST APIs that communicates through JSON, you can use the default action
`sendRequest<Success, Error>(parameters)`, where:

- `Success` is the type of the structure returned in the response's body in case of a successful request (optional);
- `Error` is the type of the structure returned in the response's body in case of a server error (optional);
- `parameters` is an object containing all parameters expected by the `sendRequest` action.

### Parameters

- url: the only required parameter. This is the url to send the request to.
- method: the request method. Default is `get`.
- headers: a map containing the headers to send with the request.
- data: the data to send with the request. This will be serialized as a JSON and is invalid for `get` requests.
- onSuccess: event that runs when the request succeeds. This must be an action factory, i.e. a function that returns
actions. This function receives an [implicit context](/context#implicit-contexts) containing the status code
(`statusCode`), status text (`statusText`) and body (`data`) of the response. The type of the property `data` will be
`Success`, passed in the first generic.
- onError: event that runs when the request fails. This must be an action factory, i.e. a function that returns
actions. This function receives an [implicit context](/context#implicit-contexts) containing the status code
(`statusCode`), status text (`statusText`) and body (`data`) of the response. It also contains the message of the
exception if one has been thrown (`message`). The type of the property `data` will be `Error`, passed in the second
generic.
- onFinish: event that runs when the request finishes (after onSuccess and onError). This is not an action factory, it
should receive the actions directly.

## Using the sendRequest action
You can use the `sendRequest` action just like any other action. It's mostly used when submitting a form or initializing
a screen. See below an example that shows the text "Loading..." while the request is pending and the product details
when it completes.

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { sendRequest, alert } from '@zup-it/beagle-backend-core/actions'
import { Container, If, Then, Else } from '@zup-it/beagle-backend-components'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { Product } from '../model/product' // describing this interface is not important for this example

interface ProductDetailsRequest extends ScreenRequest {
  routeParams: {
    id: string,
  }
}

interface ProductContext {
  data?: Product,
  isLoading: boolean,
}

export const ProductDetailsScreen: Screen<ProductDetailsRequest> = ({ routeParams: { id }}) => {
  const productContext = createContext<ProductContext>('product', { isLoading: true })
  const product = productContext.get('product')
  const isLoading = productContext.get('isLoading')

  const loadProduct = sendRequest<Product>({
    url: `https://my-backend.com/product/${id}`,
    onSuccess: response => product.set(response.get('data')),
    onError: response => alert(response.get('message')),
    onFinish: isLoading.set(false),
  })

  return (
    <Container context={productContext} onInit={loadProduct}>
      <If condition={isLoading}>
        <Then><>Loading...</></Then>
        <Else>
          <>
            <>Name: {product.get('name')}</>
            <>Price: {product.get('price')}</>
            <>Description: {product.get('description')}</>
          </>
        </Else>
      </If>
    </Container>
  )
}
```

## Composing requests
In the previous example we used a local context and a `sendRequest` action to load a product and show its details. It
works just fine, but code-quality wise it can be improved. When building front end applications we should never mix the
definition of network requests (url, method, headers, etc) with the screen structure. The example we gave voids this
principle. Instead, we should have a place where we declare our network functions separately, then, in the screen code,
we should just call them.

We recommend creating a directory called `network` to place these functions. Then, for each REST resource, a file with
all its requests should be created. For the previous example, we'd create the file `network/product.ts`.

The ideal code for the previous example would be:
```tsx
// ...
import { findProductById } from '../network/product'

// ...

export const ProductDetailsScreen: Screen<ProductDetailsRequest> = ({ routeParams: { id }}) => {
  // ...

  const loadProduct = findProductById({
    id,
    onSuccess: response => product.set(response.get('data')),
    onError: response => alert(response.get('message')),
    onFinish: isLoading.set(false),
  })

  // ...
}
```

So we have to create and export the function `findProductById` in `network/product.ts`. In summary, we must divide the
`sendRequest` in two steps, the first, declared in the function `findProductById` provides the url and method, while
the second, in the screen itself, provides the id and callbacks.

Fortunately, Beagle offers an API that makes it very easy to compose requests in two steps. See the example below:

```typescript
import { request } from '@zup-it/beagle-backend-core/actions'
import { Product } from '../model/product' // describing this interface is not important for this example
import { baseUrl } from '../constants' // it's important to have the base url declared as a constant

// the more semantic properties for the new function, findProductById needs only an id, not the full url
interface GetByIdOptions {
  id: string, // if you want to also accept context values, don't forget to change this to Expression<string>
}

export const findProductById = request<Order>()
  .compose(({ id }: GetByIdOptions) => ({ url: `${baseUrl}/product/${id}`, method: 'get' }))
```

Now you just need to call `findProductById` to create the `sendRequest` action you need. `findProductById` will require
the property `id`, that must be a `string`, as defined by `GetByIdOptions`. It will also accept any property accepted by
`sendRequest`, but the ones that have already been defined, in this case, it will accept `onSuccess`, `onError`,
`onFinish`, `headers`, `data` and `analytics`, but will not accept either `url` or `method`.

In summary, `request<Success, Error>()` creates a function that, when called, creates a `sendRequest<Success, Error>`
with the combined properties of both function calls. The TS typing system guarantees that the properties provided in
the first call aren't required again in the second call.

## Keep reading
**Next topic: [Analytics](/analytics)**
