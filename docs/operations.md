# Operations

## Contents
1. [Introduction](#introduction)
1. [Using Operations](#using-operations)
1. [Default Operations](#default-operations)
1. [Creating your own Operations](#creating-your-own-operations)
1. [Keep reading](#keep-reading)

## Introduction
Operations, just like Contexts are part of the Beagle Expressions. It is very important to understand
[Beagle Contexts](/contexts) before jumping into this.

As we explained in the topic for Contexts, they're only evaluated when run by the frontend, so we can't use pure
javascript operators or functions to manipulate them. For example, if `results` is a Context, we can't do
`results.get('page') + 1` to calculate the next page; we can't do `results.get('data').length` to know the number
of elements in the result table. `results.get('page')` is of type `ContextNode<number>`, it's not the primitive type
`number`; and `results.get('data')` is of type `ContextNode<any[]>`, which is not an array. They both are only
references to values that will exist in the frontend at runtime, since we don't know their values when creating the
screen in the backend, we can't treat them as common JS variables, we don't know their values.

Applying an operation to a context value is very important though. If we can't use JS operators or common functions,
we must be able to do it in some other form. This is what the Beagle Operations are for! They're a way of manipulating
the Beagle state.

## Using Operations
Operations in Beagle are instances of the class `Operation<T>`, where `T` is the return type of the Operation. But you
don't really need to know this for using them, their use is very simple and intuitive, you can use them just like any
JS function. See the example below:

```tsx
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { sum } from '@zup-it/beagle-backend-core/operations'
import { Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'

const counter = createContext('counter', 0)

export const MyScreen: Screen = <Button onPress={counter.set(sum(counter, 1))}>value: {counter}</Button>
```

Above, `sum` is a Beagle Operation factory, but we can call it just an operation.

Since it's much easier to deal of Beagle Operations when they are functions, instead of instantiating `Operation` by ourselves, we use functions that do this for us. The code becomes much more intuitive. The syntax is just like any other
JS function and the fact that it returns an instance of `Operation<number>` is hidden from the developer, being used
only for type checking by the compiler.

## Default Operations
Beagle ships with some Operations, below you can see a list with all of them and links to their API docs.

### Array
- [`insert(array, element [, index])`](todo)
- [`remove(array, element)`](todo)
- [`removeIndex(array [, index])`](todo)
- [`contains(array, element)`](todo)
- [`union(...arrays)`](todo)

### Logic
- [`condition(premise, ifTrue, otherwise)`](todo)
- [`not(value)`](todo)
- [`and(...values)`](todo)
- [`or(...values)`](todo)

### Number
- [`sum(...numbers)`](todo)
- [`subtract(...numbers)`](todo)
- [`multiply(...numbers)`](todo)
- [`divide(...numbers)`](todo)
- [`gt(left, right)`](todo)
- [`gte(left, right)`](todo)
- [`lt(left, right)`](todo)
- [`lte(left, right)`](todo)

### Other
- [`isNull(value)`](todo)
- [`isEmpty(value)`](todo)
- [`length(value)`](todo)

## Creating your own Operations
Beagle will probably increase its default operations as the time goes, but it will never be enough, mainly because
specific applications will need specific operations. For this reason, we let the developer extend the list of operations
Beagle can handle.

#### First step
The first step when creating a custom operation is deciding on its signature. We must know what the name is going to
be and what arguments it will accept. It is important to remark here that Operation names must be unique, Beagle does
not support "operation overloading".

Let's say we want an Operation to format phone numbers: "formatPhoneNumber(number: string, country: string) => string".
The name of the operation is "formatPhoneNumber" and it accepts 2 arguments, the phone number itself and a country
acronym, both strings. The Operation, after executed produces a value of type string.

#### Second step
Now that we know the Operation we need to implement, let's declare it in the Backend TS:

```typescript
import { Operation } from '@zup-it/beagle-backend-core'

/**
 * Formats a phone number.
 *
 * @param number the phone number to format.
 * @param country a country acronym so the format can be correctly localized.
 * @returns an instance of Operation<string>. i.e. an operation that results in a string when run by the frontend.
 */
export const formatPhoneNumber = (
  number: Expression<string>,
  country: Expression<string>,
) => new Operation<string>('formatPhoneNumber', [number, country])
```

Above, we created a Beagle Operation Factory, it creates operations of the type "formatPhoneNumber". It's a function
and it receives a phone number (first parameter) and a country acronym (second parameter). The Operation returned is
of type `Operation<string>`, because when run in teh frontend, this operation yields a string. To create the Operation
we called the class constructor, which receives the operation name as the first parameter (must be the same as the one
declared in the frontend) and an array of arguments as the second parameter.

Notice that both arguments have been typed as Expressions, this means the function will accept any string, but also
Contexts and Expressions that represent strings.

Before the function itself we wrote a special type of comment. This is called JSDocs and is very important for making
it easier to use and maintain the code. We advise using it whenever it's possible.

#### Third step
The third step is to actually implement the operation in the frontend, which is out of the scope of this text. Please
read the documentation corresponding to the frontend lib you're using to learn exactly how to do this.

## Keep reading
**Next topic: [Actions](/actions)**
