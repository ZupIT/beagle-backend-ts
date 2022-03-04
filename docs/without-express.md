# Using the Beagle Backend Typescript without Express
If you need to use the backend for Beagle in Typescript, but can't use Express, you should use only the libs
`@zup-it/beagle-backend-core` and `@zup-it/beagle-backend-components`. Everything in this documentation, but the
resources imported from `@zup-it/beagle-backend-express` are valid for this scenario.

The main difference is that you won't have access to the type `Screen` and the dependencies injected into it, but
although they help a lot and prevent small mistakes, they're not necessary to develop a Beagle Application. Instead of
using the type `Screen`, you should use `FC` to create the screens.

You'll also not have access to the `BeagleApp` class, so every route must be registered manually in the server
technology of your preference. The important thing here that has not been mentioned in the rest of this documentation is
the method [`serialize`](todo). This method is implicitly called by the `BeagleApp` when using `Express`, but in this
case, it should be called manually. This method is responsible for taking a JSX element (or an instance of Component)
and serializing it into a JSON string. See the example below:

```tsx
import { BeagleJSX, serialize } from '@zup-it/beagle-backend-core'

const MyScreen: FC = () => <>Hello World</>

const myScreenAsJson: string = serialize(MyScreen())
```

## Keep reading
**Next topic: [Advanced topics: Context](/advanced/context)**
