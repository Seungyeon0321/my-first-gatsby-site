---
title: Learning React Redux
subtitle: learning programming is super cool!
date: "2023-08-16"
slug: learn-react-redux
author: Simon Seungyeon Ji
image: https://www.computerhope.com/jargon/j/javascript.png
---

# Let's start studying React Redux

### React-Redux is the official Redux UI binding library for React

## Summary

1. React is a library used to build interfaces
2. Redux is a library for managing state in **a predictable way** in JavaScript applications
3. React-Redux is a library that provides bindings to use React and Redux together in an application

## Three Core Concepts

Let's think about the cake shop, there are 2 aspects we need to consider

| Entities                       | Activities                                |
| ------------------------------ | ----------------------------------------- |
| Shop = Stores cakes on a shelf | Customer - Buy a cake                     |
| ShopKeeper                     | Shopkeeper - Remove a cake from the shelf |
| Customer                       | - Receipt to keep track                   |

</br>

How is this scenarios related to the Redux?

| Cake Shop Scenario    | Redux   | Purpose                             |
| --------------------- | ------- | ----------------------------------- |
| Shop                  | Store   | Holds the state of your application |
| intention to BUY_CAKE | Action  | Describes what happened             |
| Shopkeeper            | Reducer | Ties the store and actions together |

</br>

- A store that holds the state of your application.
- An action that describes the changes in the state of the application
- A reducer which actually carries out the state transition depending on the action

========================================================================================

# Three Principles

## First Principle

**The state of your whole application is stored in an object tree within a single store**
Maintain our application state in a single object which would be managed by the Redux store

## Second Principle

**The only way to change the state is to emit an action, an object describing what happened**
To update the state of your app, you need to let Redux know about that with an action
No allowed to directly update the state object - we use type object

```js
{
  type: ACTION__BUY;
}
```

## Third Principle

**To specify how the state tree is transformed by actions, you write pure reducers**
Reducer - (previousState, action) => newState

```js
const reducer = (state, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        numOfCakes: state.numOfCakes - 1,
      };
  }
};
```

### Actions

- The only way your application can interact with the store(state)
- Carry some information from your app to the redux store
- Plain JavaScript object
- Have a 'type' property that indicates the type of action being performed
- The 'type' property is typically defined as string constants

```js
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux Action",
  };
}
```

### Reducers

- specify how the app's state changes in response to actions sent to the store
- Function that accepts state and actions as arguments, and returns the next state of the application
- (previousState, action) => newState

```js
// (previousState, action) => newState

const initialState = {
  numOfCakes: 10,
};

// We cannot return mutated state, we return new state
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        //...state함으로써 state의 copy를 만드는 것인가?
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};
```

### Redux Store

- One store for the entire application
- Responsibilities -

1. Holds applications state
2. Allows access to state via getState()
3. Allows state to be updated via dispatch(action)
4. Registers listeners via subscribe(listener)
5. Handles unregistering of listeners via the function returned by subscribe(listener)
