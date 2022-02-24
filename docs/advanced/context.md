# Advanced topics: Context

## Contents
1. [The context structure](#the-context-structure)
1. [The typing mechanism](#the-typing-mechanism)
1. [Creating components or actions with implicit contexts](#creating-components-or-actions-with-implicit-contexts)
1. [Keep reading](#keep-reading)

## The context structure
The Context API in the Beagle Backend TS is a sugar syntax for creating Beagle Expressions, which are strings in the
format `"@{expression}"`. This API is important because it's very hard and dangerous to work directly with strings,
since we can't type it.

A Context can be read, set or declared. For reading a context, beagle uses expressions like `"@{user.name}"` or
`"@{user.documents[0]}"`. The important information we need to have about a Context is the string between "@{" and
"}", we call it the Context path.

The class that represents the Context Path is the `ContextNode`. Every Context in Beagle Backend TS is an instance of
`ContextNode` or an instance of a class that extends `ContextNode`.

The `ContextNode` class has 4 important methods.

- **`get(property)`**: returns another `ContextNode` where the path is `` `${this.path}.${property}` ``.
- **`at(index)`**: returns another `ContextNode` where the path is `` `${this.path}[${index}]` ``.
- **`toString()`**: this is how we're able to use contexts in string interpolations and serialize it. It returns
`` `@{${this.path}}` ``.
- **`set(value)`**: this is how we solve the "set" part of the problem "a Context can be read, set or declared". This
accepts a value and creates an instance of [Action](../action), this action is a "beagle:setContext".

We called this class `ContextNode` because one `ContextNode` spawns other ContextNodes via the methods `get` and `at`.
These new ContextNodes have a weak reference to the parent in their paths. This structure simbolizes a tree where each
node is a Context.

The only problem we still need to solve is how to declare a context. In the JSON form, a context can be declared for
a component in the following manner:

```json
{
  "_beagleComponent_": "beagle:container",
  "context": {
    "id": "user",
    "value": { "name": "John", "documents": [] }
  }
}
```

The `id` already exists in the class `ContextNode`, it's the path. But we still need to inform the initial value. To
solve this we created a new class that extends `ContextNode`. This special kind of `ContextNode` that can have an
initial value is called `RootContext`, since this node will always be the root if with interpret the context path as a
tree.

The `RootContext`, instead of only accepting a `path` in its constructor, also accepts an initial value. The function
`createContext` provided by the lib does nothing more than creating an instance of this class.

Since only RootContexts can be declared, they're Local Contexts. The attribute `context` of a `Component` only accepts
a `RootContext`, if you try to pass a common `ContextNode` to it, the code won't compile.

## The typing mechanism
You might be asking yourself "if the function `createContext` only instantiates a `RootContext`, why can't I write
`new RootContext(id, initialValue)` instead of `createContext(id, initialValue)`?".

This is because the types `RootContext` and `ContextNode` are not fail-safe. If we used this type, we'd be able to
access `get` and `at` for every kind of context and we don't want this. Contexts that represents objects should have
only `get`, contexts that represent arrays should have only `at` and contexts that represent primitive types should have
none. To achieve this behavior we need to declare new types and use Typescript's conditional typing feature to write
them.

The new types with the behavior we want are:

- **`PrimitiveContextNode<T>`**: it's a `NodeContext` of `T`, but it doesn't have the methods `get` and `at`.
- **`MapContextNode<T>`**: it's a `NodeContext` of `T`, but it doesn't have the method `at`.
- **`ArrayContextNode<T>`**: it's a `NodeContext` of `T`, but it doesn't have the method `get`.
- **`AnyContextNode<T>`**: this is the most useful of these types and should be the one you actually use in your code.
It's a conditional type: if `T` is a map, it's assigned to `MapContextNode<T>`, if `T` is an array, it's assigned to
`ArrayContextNode<T>`, otherwise it's assigned to `PrimitiveContextNode<T>`.

All of the types above have a RootContext equivalent: `PrimitiveRootContext<T>`, `MapRootContext<T>`,
`ArrayRootContext<T>` and `AnyRootContext<T>`.

You don't need to worry too much about these types, the functions `createContext`, `createContextNode`, `context.get`
and `context.at` will take care of this for you.

## Creating components or actions with implicit contexts
Implicit contexts are always created by components or actions in the frontend, all we do here is create references to
them. If you're creating a component that has an event that spawns an implicit context, you can use the function
`createContextNode` to create the reference.

We use `createContextNode` instead of `createContext` because we are not declaring a new context, they don't have an
initial value and they are not associated to the attribute `context` of a Component. In other words, these are contexts
with only a path, they're instances of `ContextNode`, but not `RootContext`.

`createContextNode` accepts a single argument: the name (path) of the context. See the example below:

```tsx
import { BeagleJSX, FC, createContextNode } from '@zup-it/beagle-backend-core'

interface Props {
  onChange: (value: AnyContextNode<string>) => Actions,
}

const TextInput: FC<Props> = ({ id, onChange }) => {
  const onChangeActions = onChange(createContextNode('onChange'))
  return <component name="textinput" id={id} properties={{ onChange: onChangeActions }} />
}
```

First, we declared that our component accepts the attribute `onChange`, which should be a function that receives a
Context of type `string` and returns [`Actions`](todo).

When we create the actual component via the tag `<component />`, we must execute `onChange` first to compute the actual
actions that should go into the component. A component can accept Beagle Actions, but it can never receive functions as
its properties (functions are not serializable).

To create the implicit context that goes in the function argument, we use the function `createContextNode`. The single
argument we pass is the name of the context, this should be the same name the frontend uses. To avoid confusion, we
recommend always naming it according to the event. For instance, if the event name is `onChange`, the context name
should be `onChange`.

The same is strategy can be used when creating actions that spawn implicit contexts.

## Keep reading
todo
