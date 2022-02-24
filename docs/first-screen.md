# Creating your first screen
Now that you installed and created your project with our cli tool, it's time to create a screen!

## 1. Create the new file
Under `src/screens`, create the file `my-screen.tsx` with the following content:
```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'

export const MyScreen = () => <>Hello from my first screen!</>
```

First, notice that the file extension for the screen is `tsx` and not `ts`. This is important because our screens is
written in TSX, which is an extended version of Typescript. It's very easy to identify TSX code, you just need to look
for tags that look like HTML, e.g. `<Container></Container>`. TSX code will always need the tsx extension and a special
import: the TSX interpreter, in our case `BeagleJSX`.

When reading about TSX, you'll see the terms JSX and TSX used intermittently. Both are correct and they work just like
JS and TS. JSX is the general term, while TSX is JSX extended to support typescript types.

JSX was introduced by React, which is a great tool for web development that inspired much of the today's architectures
for declarative UIs. For this reason, you'll see that writing for Beagle using the backend TS is very similar to writing
React code. This is good because React is a very well known tool and might easy the learning curve for developers that
are new to Beagle.

An empty JSX tag (`<>` and `</>`) is also a valid tag, it's called a fragment. A fragment, by default, renders a
`beagle:text` if you use a string as its child or a `beagle:container` if you use other components. To change the
behavior of the fragment, check the section ["creating your own components"](todo).

To know more about JSX and TSX, please read the original documentation in
[the React's docs](https://reactjs.org/docs/jsx-in-depth.html). Just notice that instead of importing `React`,
as stated in their docs, here you're going to import `BeagleJSX`. It's also important to remember that HTML tags are
not accepted in Beagle, even though they are accepted in React.

## 2. Create the new route
Edit the file `src/screens/index.ts` to add the new route:

```typescript
// ...
import { RouteMap } from '@zup-it/beagle-backend-express'
import { myScreen } from './my-screen'

export const routes: RouteMap = {
  // ...
  '/my-screen': MyScreen,
}
```

In the code above we set up the screen we created before as the screen to be rendered when the URL "$baseUrl/my-screen"
is accessed. "$baseUrl" is the baseUrl given when creating the BeagleApp instance, in the index file. If no baseUrl
was provided, then the route will be created at the servers root.

The routes, i.e, the keys of the map in the code above can be any valid express route. e.g. `'product/:id'` is a route
with a parameter: the id. To know more about creating express routes, read
[this article](http://expressjs.com/en/guide/routing.html).

The screens, i.e., the values of the map in the code above can be either the screen, directly, or an object containing
the screen and the method of the request (default is `get`). See the example below for a route that register a new
user:

```typescript
// ...
export const routes: RouteMap = {
  // ...
  '/user': { method: 'post', screen: NewUser },
}
```

Most of the times your screens will only be retrieving data and not modifying it, so we recommend not changing the
default behavior, which is `get` requests, unless you really need to and know what you're doing.

In both previous examples: a route with a parameter and a route which is `post` instead of `get` we'll have extra
data to deal with in our screen. This data can be retrieved using the types `Screen` and `ScreenRequest`. Let's see
in the next topic how to use them!

## 3. Run it!
If your project is already running, go to the browser and access `http://$domain/$baseUrl/my-screen`, where domain
is "localhost:3000" and baseUrl is "beagle" if you haven't changed it from the original boilerplate.

If the project is not yet running, first run `yarn start` at the root of your project.

The browser should show the JSON corresponding to the screen you just created!

## Keep reading
**Next topic: [Typing your screens](/typing-screens)**
