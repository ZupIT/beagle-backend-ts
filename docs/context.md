# Context

## Contents
1. [TLDR;](#TLDR)
1. [Introduction](#introduction)
1. [The Expression type](#the-expression-type)
1. [Local Contexts](#local-contexts)
1. [Implicit Contexts](#implicit-contexts)
1. [Navigation Contexts](#navigation-contexts)
1. [The Global Context](#the-global-context)
1. [Reading from a Context](#reading-from-a-context)
1. [Writing to a Context](#writing-to-a-context)
1. [Advanced topics](#advanced-topics)
1. [Keep reading](#keep-reading)

## TLDR;
Contexts are the Beagle way of creating and manipulating a state that can shared among the components. They can appear
in four different flavours. See the examples below:

### Local Contexts
```tsx
const username = createContext<string>('username', 'John')

export const MyScreen: Screen = () => <Container context={username}>{username.get('name')}</Container>
```

### Implicit Contexts
```tsx
export const MyScreen: Screen = () => <TextInput onChange={value => alert(value)} />
```

### Navigation Contexts
```tsx
interface MyScreenRequest extends ScreenRequest {
  navigationContext: {
    address: Address,
  }
}

export const MyScreen: Screen<MyScreenRequest> = ({ navigationContext }) => (
  <>{navigationContext.get('address').get('street')}</>
)
```

### Global Context
```tsx
interface GlobalContext {
  username: string,
}

const globalContext = getGlobalContext<GlobalContext>()

export const MyScreen: Screen = ({ navigationContext }) => <>{globalContext.get('username')}</>
```

To read from Contexts use the methods `get` (objects) and `at` (arrays). To write to Contexts, use the method `set`.

## Introduction
Beagle has no script language embedded in it, and we defend that it shouldn't have one. But we still need to make it
possible to create dynamic UIs from the backend. To solve this issue, Beagle introduces three concepts: Contexts,
[Operations](/operations) and [Actions](/actions). This topic talks about Contexts.

Contexts are the Beagle way of creating and manipulating a state that can shared among the components. We could make an
equivalence to variables in programming languages, they can be declared (local contexts), some are global (global
context) and others are injected into your code (navigation context and implicit contexts).

Contexts are variables of Beagle, they're not variables of your backend application, i.e. Beagle Contexts are resolved
when the code is run by the frontend, and not when the request is made to the server.

NodeJS will read your screen code and serialize it as a JSON. Beagle Contexts are serialized in a special syntax called
Beagle expressions. Example: `"@{user.name}"`.

The Beagle Contexts we create in the backend application, will be serialized into Beagle Expressions (strings), which
will only be resolved by the frontend application.

It is very important to know this so you can understand something like `user.get('age') + 5` or
`user.get('documents').length` would never work. Considering `user` is a Beagle Context, we can't possibly know its
value until the frontend runs it.

In any case, both of the examples above wouldn't compile, since they would give type errors. `user` is of type
`ContextNode`. Every Context is a `ContextNode`. A `ContextNode` holds a **reference** to a variable that will only know
its value when executed by the frontend application.

To make operations over Beagle Contexts, instead using javascript operators, you should use
[Beagle Operations](/operations), which also translates to Beagle Expressions (string) when serialized, i.e. they're
also resolved when run by the frontend application.

## The Expression type
Beagle Contexts and Beagle Operations are sugar syntaxes for Beagle Expressions. In Beagle Backend TS, we have a special
type called `Expression<T>`. When a variable is of type `Expression<T>`, it means it accepts the type `T`, a Context
referencing a variable of type `T` or an Operation that results in `T`.

In many cases instead of using `T` for an attribute of your [component](/components) or [action](/actions), you'll
actually want to use `Expression<T>`, which just means that it accepts anything that will end up as the type `T` in the
frontend. See the example below for the custom component `Card`, first introduced
[here](/components#creating-components).

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { WithStyle, StyledComponent } from '@zup-it/beagle-backend-components'

interface Props extends WithChildren, WithStyle {
  title?: Expression<string>,
  elevation: Expression<number>,
  coverArt?: Expression<string>,
}

export const Card: FC<Props> = ({ id, children, style, ...properties }) => (
  <StyledComponent name="card" id={id} style={style} properties={properties}>
    {children}
  </StyledComponent>
)
```

Now the component `Card` also accepts Beagle expressions instead of only strings or numbers.

## Local contexts
Local contexts are generally used for holding values that are accessed by multiple components, like a Form. It allows
interaction between components. It is also useful for holding responses from lazily loaded data. For instance, one could
use the action [`sendRequest`](todo) to load a list of products and use a local context to store them, so they can be
displayed by a [ListView](todo).

### Creating a local context
A local context can be created via the function `createContext`. This function accepts 2 arguments

1. The first is a string with a name to the context. This name is useful for identifying which context is which in the
frontend and making it possible for the frontend to give useful errors messages like:
`Can't find context with name "person"`.
2. The initial value the frontend application should give to the context. This is optional and when not provided, the
context will be initialized with null.

`createContext` is a generic function, i.e., it can receive a type `T` and act differently (type-wise) according to it.
Let's say we want to create a context that holds a string:

```typescript
import { createContext } from '@zup-it/beagle-backend-core'

const username = createContext<string>('username')
```

Simple right? `username` is now a Beagle context that refers to a string value. You can pass any type you want in the
generic, but for simple types like this, when you provide the second argument (initialization), you can omit the
generic, since it can be easily inferred by the language.

**Notice the type is `string` and not `Expression<string>`. You shouldn't use the type `Expression` when typing**
**contexts, It is implicit that any Beagle Context accepts expressions.**

```typescript
import { createContext } from '@zup-it/beagle-backend-core'

const username = createContext('username', 'John')
```

Let's see a more complex example of a context:

```typescript
interface Document {
  name: string,
  value: string,
  image?: string,
}

interface User {
  id: string,
  name: string,
  lastName: string,
  age: number,
  documents: Document[],
}

const user = createContext<User>('user')
```

It is extremely important to specify the generic type whenever the second argument is not provided. In the code above,
we created a context that holds a `User`.

### Declaring a local context:
Local contexts are the only type of contexts that need to be declared. As their name says they're local, so we must
know: "local for what?".

To answer this question, we declare the context we created for a component, using the attribute `context`. When a
context is declared for a component, this context will be accessible by this component and any of its descendants. In
other words, the scope of a local context is the component where it's declared plus its descendants. See the example
below:

```tsx
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { Container } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

// (...) consider the context user declared in the previous example

const MyScreen: Screen = () => (
  <Container context={user}>
    <>Welcome {user.get('name')} {user.get('lastName')}!</>
  </>
)
```

In the code above we declared `user` to the root component, i.e. it will be accessible by every component in the screen.
After declaring the context, we printed the user name using the context interface.

If a local context is not declared, when running the code in the frontend, Beagle will be unable to find it, producing
log messages like `Couldn't find context of name "user"`.

## Implicit contexts
The only difference from local contexts is that implicit contexts don't need to be created or declared, they're still
local, but they're implicit to the code.

### Implicit contexts in components

In practicality, implicit contexts are  contexts that are injected by components. They are injected through functions
and their scopes are the component where they appear plus its descendants.

Take a Text Input, for instance, it has the property `onChange`. When programming an on change event, we generally need
to know what changed. The new text value is an implicit context! We didn't declare it, but it does exist. We receive
this context through a function, see the example below:

```tsx
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { TextInput } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

const MyScreen: Screen = () => <TextInput onChange={value => alert(value)} />
```

The example above is very simple and it states that every time the value of the input changes, an alert dialog will
appear in the screen with the new value typed.

`alert` is an action. To know more about actions, check [this article](/actions.md).

Other components that provides implicit contexts are:

- PageView:
```tsx
<PageView onPageChange={newPageIndex => alert(`The new page is: ${newPageIndex}`)}>
```
- TabBar:
```tsx
<TabBar
  items={[{ title: 'tab 1' }, { title: 'tab 2' }]}
  onTabSelection={newTabIndex => alert(`The new tab is: ${newTabIndex}`)}
/>
```
- ListView (GridView is similar)
```tsx
<ListView dataSource={[1, 2, 4]}>
  {item => <Template><>{item}</></Template>} {/* item is an implicit context referring to the current iteration */}
</ListView>
```

### Implicit contexts in actions
Actions are better explained [here](/actions.md). But this works very similarly to components. Some actions will
inject implicit contexts, a good example is the [action to send a request](todo).

The `sendRequest` action has the events `onSuccess` and `onError`. To program the `onSuccess` event, we need to know
what was the response for the server. To program the `onError` event, we need to know what the error was. For this
reason, both of them create implicit contexts, see the example below:

```typescript
import { alert, sendRequest } from '@zup-it/beagle-backend-core/actions'
import { Product } from '../model/Product' // detailing this interface is not important for this example

const loadProducts = sendRequest<Product[]>({
  // ...
  onSuccess: response => alert(`Products loaded: ${response.data.at(0).get('name')}`)
})
```

In the code above we use the `sendRequest` action to load a list of products and we receive an implicit context in
the `onSuccess` event. This implicit context contains the response returned by the server. We then open an alert dialog
box telling the name of the first product in the list.

### More about implicit contexts
If you need to create your own components or actions that inject implicit contexts themselves, please read the article
[Advanced topics: Context](/advanced-context).

## Navigation contexts
The scope of local and implicit contexts are very limited and won't survive navigations. The next larger scoped
contexts are the navigation contexts, plural because there will be one navigation context for each screen of the
application. A navigation context is created when the screen is first rendered and destroyed only when it leaves the
navigation stack of the application.

The navigation contexts are useful for passing data between pages. Let's say we have a multi-screen form and we don't
want to send the data to the server before we fill them all. In this case, the first form can pass its data to the
second form, which can send all the data to the server at once.

Another use case is for detailing some item in a list. Let's say we have a list of products and the backend already
brought all the data we need to create a "details" page for the product. Instead of asking the backend again for the
same data, we can send the product selected to the next screen to display.

The possibilities are endless! When finishing an order, we could check if the user already set up the address, if not,
we can start a "fill address flow", making the last page of the flow send the user back to the order page, but with an
address in the navigation context.

As stated previously, each screen has its own navigation context, and as mentioned in the topic
[Giving a type to your screens](/typing-screens.md) we can tell Beagle what kind of navigation context is expected by a
screen. See the example below:

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Container } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { Product } from '../model/Product' // detailing this interface is not important for this example

interface ProductDetailsRequest extends ScreenRequest {
  navigationContext: {
    product: Product,
  }
}

export const ProductDetailsScreen: Screen<ProductDetailsRequest> = ({ navigationContext }) => (
  <>Product name: {navigationContext.get('product').get('name')}</>
)
```

The navigation context is always injected into the screen, there's no need to create or declare it. If the screen
accepts a navigation context, it must declare it in the interface provided to the type `Screen`. In this case, having
the product in the navigation context is required to build this page, for this reason, both `navigationContext` and
`product` are required in `ProductDetailsRequest`. If for some reason, they weren't, you could declare them as optional
(?).

When navigating to `ProductDetailsScreen`, Typescript will make sure a navigation context with a product is provided.
The code won't compile otherwise.

## The Global Context
Sometimes we need to store values at the application level, sharing them between multiple screens and even with the
native code. Local contexts, implicit contexts or even navigation contexts can't do this, their scope are limited and
they're not visible by the entire application.

The global context can be read and set from any screen or native code. This is useful for manipulating global data
structures like a shopping cart or the current session.

To get a reference to the Global Context, we must use the function `getGlobalContext`. It is extremely important to type
this structure, and because of this, we recommend creating a single separated file for the Global Context of your
application. See the example below:

`global-context.ts`:
```typescript
import { getGlobalContext } from '@zup-it/beagle-backend-core'
import { Product } from '../model/product' // detailing this interface is not important for this example
import { User } from '../model/user' // detailing this interface is not important for this example

export interface GlobalContext {
  cart: Product[],
  user: User,
}

export const globalContext = getGlobalContext<GlobalContext>()
```

`my-screen.ts`:
```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { globalContext } from '../global-context'

export const MyScreen: Screen = () => <>Hello {globalContext.get('user').get('name')}!</>
```

The Global Context is the only type of Beagle Context that can be both read and written outside Beagle. To learn how to
do this in your frontend application, check the documentation for the Global Context for platform you're working with
(Android, iOS, Web or Flutter).

## Reading from a Context
To read from a Beagle Context you should use the methods `get` and `at`.

- `get` access properties of a context that refers to an object;
- `at` access indexes of a context that refers to an array.

See the example below:

```tsx
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { Container } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

interface Person {
  name: string,
  age: number,
  nicknames: string[],
}

const person = createContext<Person>('person', {
  name: 'John',
  age: 30,
  nicknames: ['J', 'Dude', 'Guy']
})

export const MyScreen = () => (
  <Container context={person}>
    <>
      Hello {person.get('name')}! You're {person.get('age')} years old and also attends by the names
      {person.get('nicknames').at(0)}, {person.get('nicknames').at(1)} and {person.get('nicknames').at(2)}.
    </>
  </Container>
)
```

Above, we use `get` when the context is an object and `at` when it's an array. But don't worry too much, TS will take
care of this for us, it will only accept `get` when it's an object, only `at` when it's an array and when it's a
primitive type, it won't accept neither `get` nor `at`.

Tip: normally, to display the contents of an array, instead of accessing its indexes, we want to iterate over all of its
items. To do so, you'd need a [ListView](todo) or a [GridView](todo). To format an array into a string, you'd need a
[custom operation](/operations).

## Writing to a Context
To modify the content of a Context, we need an [Action](/actions). To create this action, we can call the method `set`
of the context. See the example below:

```tsx
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { sum } from '@zup-it/beagle-backend-core/operations'
import { Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

const counter = createContext('counter', 0)

export const MyScreen: Screen = <Button onPress={counter.set(sum(counter, 1))}>value: {counter}</Button>
```

Above, we created a screen with a single button where the label increments in one every time it's clicked. `context.set`
will only accept values of its type or Expressions of it. `sum` is one of the [Operations](/operations) shipped with
Beagle.

> Global Contexts can be set outside Beagle by the frontend application. To know more check the documentation for
the frontend lib you're using.

## Advanced topics
This article gave you the basic knowledge to understand and use Beagle Contexts. To go a step further and learn things
like injecting implicit contexts for your own components and actions, please read
["Context" in the "Advanced topics" of this documentation](/advanced/context).

## Keep reading
**Next topic: [Operations](/operations)**
