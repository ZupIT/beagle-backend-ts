# Composite Components
We use JSX to write our components. JSX are basically functions and the same way we can call functions from within
other functions, we can call JSX components from withing other JSX components. We call these "composite components" or
"screen fragments".

For developers familiar with React, this is nothing new, but let's give an example: suppose we have a card UI in our
screen, and this card repeat itself several times.

```tsx
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Container, Text, Image } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

export const MyScreen: Screen = () => (
  <>
    <Container style={{ cornerRadius: 10, margin: 10, padding: 20, borderColor: colors.lightgray }}>
      <Text textAlign="CENTER" styleId="header">Section 1</Text>
      <Image type="remote" url="/section1-header.png" style={{ width: '100%', height: 60 }} mode="CENTER_CROP" />
      <Text textColor={colors.darkgray}>Section 1 content</Text>
    </Container>

    <Container style={{ cornerRadius: 10, margin: 10, padding: 20, borderColor: colors.lightgray }}>
      <Text textAlign="CENTER" styleId="header">Section 2</Text>
      <Image type="remote" url="/section2-header.png" style={{ width: '100%', height: 60 }} mode="CENTER_CROP" />
      <Text textColor={colors.darkgray}>Section 2 content</Text>
    </Container>

    <Container style={{ cornerRadius: 10, margin: 10, padding: 20, borderColor: colors.lightgray }}>
      <Text textAlign="CENTER" styleId="header">Section 3</Text>
      <Image type="remote" url="/section3-header.png" style={{ width: '100%', height: 60 }} mode="CENTER_CROP" />
      <Text textColor={colors.darkgray}>Section 3 content</Text>
    </Container>
  </>
)
```

The code above is extremely repetitive, why don't we extract the styled Container into a new component and call it
"Card"?

```tsx
import { BeagleJSX, FC } from '@zup-it/beagle-backend-core'
import { Container, Text, Image } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

interface CardProps {
  title: string,
  imageUrl: string,
  content: string,
}

const Card: FC<CardProps> = ({ id, title, imageUrl, content }) => (
  <Container style={{ cornerRadius: 10, margin: 10, padding: 20, borderColor: colors.lightgray }}>
    <Text textAlign="CENTER" styleId="header">{title}</Text>
    <Image type="remote" url={imageUrl} style={{ width: '100%', height: 60 }} mode="CENTER_CROP" />
    <Text textColor={colors.darkgray}>{content}</Text>
  </Container>
)

export const MyScreen: Screen = () => (
  <>
    <Card title="Section 1" imageUrl="/section1-header.png" content="Section 1 content" />
    <Card title="Section 2" imageUrl="/section2-header.png" content="Section 2 content" />
    <Card title="Section 3" imageUrl="/section3-header.png" content="Section 3 content" />
  </>
)
```

Much better! You can create composite components just like any other component, the only difference is that you're
going to use components that already have been declared by yourself or a lib instead of the tag `<component />`.

In the example above we declared `Card` in the same file as the screen because it would be used only by this screen.
But the more interesting application is when you use these UI fragments across multiple screens, reducing the overall
amount of code and maintenance. To make `Card` available for other screens, you just need to declare it in a separate
file and export it. We recommend creating a directory in your project just for these kind of components, a good name for
this directory would be `fragments`.

## Keep reading
**Next topic: [Context](/context)**
