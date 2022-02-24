# Components
> If you're not interested in learning how components work and just want to use the components provided by Beagle, skip
to the section ["Default Beagle Components"](todo).

Components are the main structure in Beagle and in Beagle Backend TS they are always represented by JSX tags. These
JSX tags, after processed become instances of the class Component, which can be serialize to JSON whenever a request to
a screen is made.

Although we recommend always using the JSX syntax, just like in React, the JSX is nothing more than sugar syntax. Using
JSX is the same of instantiating the Component class, see the example below:

JSX:
```jsx
<component namespace="beagle" name="container">
  <component namespace="beagle" name="text" properties={{ text: 'some text' }} />
</component>
```
is equivalent to:
```typescript
new Component({
  namespace: 'beagle',
  name: 'container',
  children: new Component({
    namespace: 'beagle',
    name: 'text',
    properties: {
      text: 'some text',
    },
  }),
})
```

## The empty JSX tag (fragment)
Most previous examples used the empty JSX tag: `<></>`, but `<>some text</>` is equivalent to
`<component namespace="beagle" name="text" properties={{ text: 'some text' }} />` and `<><>some text</></>` is
equivalent to
`<component namespace="beagle" name="container"><component namespace="beagle" name="text" properties={{ text: 'some text' }} /></component>`,
i.e, an empty tag (or fragment) can be either a Container or a Text, depending on its children.

If you need to change the default behavior of the empty tag, you can use the function `setFragmentFactory`, which is a
function that receives the children of the empty tag and returns an instance of Component. See the example below:

```typescript
import { setFragmentFactory } from '@zup-it/beagle-backend-core'

setFragmentFactory(children => new Component({
  namespace: 'custom',
  name: 'card',
  children,
}))
```

The example above changes the behavior of the empty tag to render a custom component instead of a Text or Container.
Here we used the Component class directly because we're already inside the JSX processor.

## Creating components
The `<component />` tag is the only intrinsic element of the BeagleJSX language, i.e. every JSX tag will end up as a
`<component />` in the end. But, using this tag inside the UI code would be verbose and type unsafe. For this reason,
you should have your components declared separately from the UI code and they themselves should call the `<component>`
tag. See the example below for creating a simple card component.

```tsx
import { BeagleJSX, WithChildren, FC } from '@zup-it/beagle-backend-core'

interface Props extends WithChildren {
  /**
   * The title for the card.
   */
  title?: string,
  /**
   * A shadow level for the card. The higher this number, the stronger the shadow.
   */
  elevation: number,
  /**
   * A URL for an image to use at the top of the card.
   */
  coverArt?: string,
}

export const Card: FC<Props> = ({ title, elevation, coverArt, id, children }) => (
  <component name="card" id={id} properties={{ title, elevation, coverArt }}>
    {children}
  </component>
)
```

A better way to write the same code would be using the spread operator of Javascript:
```tsx
export const Card: FC<Props> = ({ id, children, ...properties }) => (
  <component name="card" id={id} properties={properties}>
    {children}
  </component>
)
```

We didn't use the property `namespace` in this example because we want the default value: "custom". Although we intend
to support any namespace value for every platform, this is not yet a reality, so we recommend sticking to the namespaces
"beagle" and "custom".

### Props: the component interface
`Props` is our component's interface, i.e., a declaration of all of its properties and children. By default, a component
will be a leaf, in other words, it won't accept children. To change this, you can make `Props` extend `WithChildren`,
just like in the example.

Notice that we used a special kind of comment to explain every property in `Props`. This is a very good practice and
we recommend doing it for every component you create. This is the in-code documentation and will appear to the developer
every time he/she hovers the property.

Although we named this interface `Props`, this name is not important, you can choose any name you want.

### Children
`WithChildren` adds `{ children?: JSX.element | JSX.element[] }` to your interface. This means that your component will
accept zero or more children. To force your component to have children (1 or more), you can use the TS helper
`Required`: `interface Props extends Required<WithChildren>`. To accept an exact number of children or children that
are not JSX elements, you must write the property `children` yourself. Check the examples below:

```typescript
interface OneChild {
  children: JSX.Element,
}

interface TwoChildren {
  children: [JSX.Element, JSX.Element],
}

interface FunctionChild {
  children: (someValue: any) => JSX.Element,
}

interface StringChild {
  children: string | string[], // string[] for multiline or string interpolation
}
```

In all of the examples above it is mandatory to pass child elements to the component. To make passing children optional
just make it optional in the interface: `children?: ...`.

### FC (Functional Component)
In the example for the Card component, we used the type `FC`, which stands for Functional Component. In Typescript, it
is important to type every variable, for this reason, we recommend typing every component with `FC`. `FC` is a generic
type that represents a function. This function must always return `JSX.Element` and it will receive as parameter an
object containing `id` plus the properties of the interface passed in its generic type. If no interface is passed in the
generic, it will only have an id.

### The attributes of a `<component />`
The component tag accepts the following attributes:

- id: optional. The id of the component, it must be unique for a single screen.
- namespace: optional. The namespace for the component. To ensure compatibility with all platforms use "beagle" or "custom". The
default value is "custom".
- name: the name of the component.
- children: optional. The child element(s) of this component.
- context: optional. The context declared by this component. To say your component accepts a context, make its `Props`
interface extend `WithContext`. To know more about contexts, read [this topic](/context.md).
- properties: optional. A map with the properties to send to the component.

## Default Beagle Components
Although you'll probably need to create your own components for any real project, Beagle ships with many components
already. These components can be found in the module `@zup-it/beagle-backend-components`. You can find below a list
of all of them and their respective links to the API documentation.

- [Button](todo);
- [Container](todo);
- [Else](todo);
- [GridView](todo);
- [If](todo);
- [Image](todo);
- [LazyComponent](todo);
- [ListView](todo);
- [PageView](todo);
- [PageIndicator](todo);
- [PullToRefresh](todo);
- [ScreenComponent](todo);
- [SimpleForm](todo);
- [TabBar](todo);
- [TextInput](todo);
- [Text](todo);
- [Then](todo);
- [Touchable](todo);
- [WebView](todo).

### Layout and style
The Beagle's default components library makes it easier to style your application. It uses the flex layout to help
positioning the elements and common styling properties like `backgroundColor` and `cornerRadius` to further customize
the components appearances.

Every component in the default component's library that can be stylized will be able to receive the property `style` of
type `Style`. See the example below for creating a row with three circles and spaces in-between:

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { Container, colors } from '@zup-it/beagle-backend-components'

const MyScreen: Screen = () => (
  <Container style={{ flexDirection: 'ROW', justifyContent: 'SPACE_BETWEEN' }}>
    <Container style={{ backgroundColor: colors.red, width: 50, height: 50, cornerRadius: 50 }} />
    <Container style={{ backgroundColor: colors.green, width: 50, height: 50, cornerRadius: 50 }} />
    <Container style={{ backgroundColor: colors.blue, width: 50, height: 50, cornerRadius: 50 }} />
  </Container>
)
```

Sizes and spaces can be expressed in both numbers (e.g. 50, for absolute values) or strings (e.g. '50%', for
proportional values).

To check the full list of available styles, please check the [API docs](todo).

### Creating new components that support styling
If you're using the module `@zup-it/beagle-backend-components`, you can take advantage of its styling system and create
custom components that also accept styling. See in the example below how we can add styling capabilities to the
previously created Card component:

```tsx
/// ...
import { WithStyle, StyledComponent } from '@zup-it/beagle-backend-components'

interface Props extends WithChildren, WithStyle {
  // ...
}

export const Card: FC<Props> = ({ id, children, style, ...properties }) => (
  <StyledComponent name="card" id={id} style={style} properties={properties}>
    {children}
  </StyledComponent>
)
```

That's all! Now the custom component "Card" accepts the style property!

### Other interfaces provided by the default components lib:
The default components lib also provides the following common interfaces for your components:

- **WithAccessibility:** adds the accessibility properties to the component;
- **WithTheme:** adds the property styleId to the component. This is used to setup themes declared in the front-end. It
is equivalent to classes in Beagle Web. In Beagle Android and Beagle iOS, check for `DesignSystem` in their respective
documentations. In Flutter, check for `BeagleTheme`.

## Keep reading
**Next topic: [Composite components](/composite-components)**
