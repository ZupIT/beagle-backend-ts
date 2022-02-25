# Actions

## Contents
1. [Introduction](#introduction)
1. [Using Actions](#using-actions)
1. [Default Actions](#default-actions)
1. [Creating your own actions](#creating-your-own-actions)
1. [Keep reading](#keep-reading)

## Introduction
Actions are the third and final Beagle feature that allows views to be dynamic. Just like operations, actions can be
viewed as functions, but with an important difference: while operations always have a return value and never have
collateral effects (it only uses its parameters to calculate the return value and don't alter anything outside its
scope), actions never have a return value and always have collateral effects.

It's true one could implement a similar behavior to an action using an operation. But this would be wrong and is highly
discouraged. Use operations to transform a context value into something else that is needed as an input to a component
or an action. Use actions to trigger behaviors like opening a dialog, playing a sound, sending a request, etc.

Actions are always associated to events. Example of events are:

- `onChange` in a text input or any other form element;
- `onTabChange` in a component that displays a tabbed view;
- `onPullToRefresh` in a scroll view with the pull to refresh behavior;
- `onInit` in any component;
- `onScrollEnd` in a list view with multiple elements;
- `onSuccess` in an action that sends a request;
- `onPressOk` in a dialog box.

There are many events that could be though of and they're always related to Components or Actions. Any action or set
of actions can be assigned to any event.

## Using Actions
Beagle Actions are instances of the class [`Action`](todo), but just like [Operations](/operations), instead of
instantiating the class ourselves, we use Action factories (functions). This makes the code more readable and easy to
use. See the example below:

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

const MyScreen: Screen = () => <Button onPress={alert('Hi!')}>Click me!</Button>
```

## Default Actions
Beagle ships with some important actions already. Below you can find a list with all of them and links to their
respective API docs.

- [`setContext`](todo) (equivalent to [`context.set`](todo));
- [`alert`](todo);
- [`confirm`](todo);
- [`conditionalAction`](todo);
- [`sendRequest`](todo) (check [this topic](/making-requests) to know more about making requests with Beagle);
- [`addChildren`](todo);
- Navigation (check [this topic](/navigation) for more details on navigation actions):
  - [`openNativeRoute`](todo);
  - [`openExternalUrl`](todo);
  - [`pushStack`](todo);
  - [`popStack`](todo);
  - [`pushView`](todo);
  - [`popView`](todo);
  - [`popToView`](todo);
  - [`resetStack`](todo);
  - [`resetApplication`](todo);
- [`submitForm`](todo) (available in `@zup-it/beagle-backend-components`);

## Creating your own actions
It' very simple to create custom Actions. The examples below show how to create an action called "notify". The idea
is that whenever "notify" is called, a floating message appears in the screen and disappears after a while.

```typescript
import { Expression, Actions, WithAnalytics } from '@zup-it/beagle-backend-core'
import { Action } from '@zup-it/beagle-backend-core/model/action' // not recommended, we'll see another approach later

interface Notify extends WithAnalytics {
  /**
   * The message of the notification.
   */
  message: Expression<string>,
  /**
   * The title to show in the box.
   */
  title?: Expression<string>,
  /**
   * The icon to show at the left of the notification.
   */
  icon?: Expression<string>,
  /**
   * The time in ms to the message disappear. Default is 300.
   */
  duration?: Expression<number>,
  /**
   * The actions to run once the user presses the notification message.
   */
  onPress?: Actions,
}

/**
 * Creates a floating notification with a message that will disappear after some time.
 *
 * @param properties @see {@link Notify}.
 */
export function notify({ message, title, icon, onPress, analytics }: Notify) {
  return new Action({
    name: 'notify',
    properties: { message, title, icon, onPress },
    analytics,
  })
}
```

First, notice that we make a strange import of the class `Action`. This is not recommended, but it's useful for this
example, in the next we'll show a better way of achieving the same result.

Every Beagle Action supports analytics and that's why we make `Notify` extend `WithAnalytics`. To know more about the
Analytics feature, check [this topic](/analytics).

The Action factory is the function `notify`. It receives the parameters needed by the action and return an instance of
`Action`. To use it, the developer only needs to import it and call `notify({ message: 'Test', title: 'Hey!' })`.

Every action factory will have basically the same code. So, to avoid repetition, instead of instantiating `Action`, you
should use the function `createAction` that does all of the code above under the hood. In fact, to prevent inefficient
usage, Beagle doesn't even export the class `Action` (that's why we needed that weird deep import). See in the example
below the recommended way of creating actions:

```typescript
import { Expression, Actions, createAction } from '@zup-it/beagle-backend-core'

interface Notify {
  message: Expression<string>,
  title?: Expression<string>,
  icon?: Expression<string>,
  duration?: Expression<number>,
  onPress?: Actions,
}

export const notify = createAction<Notify>('notify')
```

Notice that `Notify` doesn't extend `WithAnalytics` anymore. The `createAction` function knows you're creating an action
and will take care of this for you.

This second example is much more simple than the first and does the exact same thing. The only difference is that most
of the code of the first example is now encapsulated in the `createAction` function.

## Keep reading
**Next topic: [Navigation](/navigation)**
