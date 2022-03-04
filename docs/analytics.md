# Analytics

## Contents
1. [Introduction](#introduction)
1. [The frontend configuration](#the-frontend-configuration)
1. [The backend overwriting](#the-backend-overwriting)
1. [Links](#links)
1. [Keep reading](#keep-reading)

## Introduction
The analytics system in Beagle is a way to track screen views and actions that have been triggered. Screen views can
only be controlled in the frontend, but whether or not to track an action and which information to track can be set up
by the backend.

To know more about the Beagle Analytics and how to set it up in the frontend, check
[this article](https://docs.usebeagle.io/v2.0/api/analytics/) in the documentation.

## The frontend configuration
In the frontend the user sets up the Analytics Provider, where a configuration is loaded. This configuration tells
whether or not to track screen views, what actions to track and what properties of each action should be tracked.

## The backend overwriting
The backend can overwrite any frontend configuration by specifying the property `analytics`, that exists in any action.
For example, despite the frontend configuration, I can tell that an specific `alert` action must generate an analytics
record, i.e. must be tracked:

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { Button } from '@zup-it/beagle-backend-components'

const MyScreen: Screen = () => (
  <Button onPress={alert({ message: 'Hello World', title: 'Welcome', analytics: { attributes: { message: true } } })}>
    Click me!
  </Button>
)
```

Above, we declared that the action will be tracked and it will expose only the property `message`. To avoid exposing
sensitive data, by default, an analytics record exposes only the action name and the event it was triggered by. If
there is already a configuration for alert actions in the frontend, it is overwritten by this.

To disable tracking for an specific action, you can set `analytics` to `false`:

```tsx
<Button onPress={alert({ message: 'Hello World', title: 'Welcome', analytics: false })}>
  Click me!
</Button>
```

Sometimes you might also want to send additional data to the analytics service. This can be done via the property
`additionalEntries`:

```tsx
<Button onPress={alert({
  message: 'Hello World',
  title: 'Welcome',
  analytics: { additionalEntries: { username: 'john@company.com', userGroup: '01' } },
})}>
  Click me!
</Button>
```

## Links
To know more about analytics in Beagle, check [this link](https://docs.usebeagle.io/v2.0/api/analytics/).
To read the API docs for the Analytics, check [this link](todo).

## Keep reading
**Next topic: [Testing](/testing)**
