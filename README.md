# react-native-theme-style

## The problem

You want to:

- Apply styles to your react-native component according to a theme
- not use styled-components because of various reasons (Jest/Flow/etc issues)
- have a fully typed theme (Flow and Typescript support)
- A lightweight solution which is plain React and use the power of Hooks and context

Welcome to react-native-theme-style.

## Usage

You must have **React-Native 0.59+** installed

1. Install

```bash
yarn add react-native-theme-style
```

2. Create your theme context

```jsx
// ./src/theme.jsx

import * as React from "react";
import { configureTheme } from "react-native-theme-style";

const defaultTheme = { color: "red" };
export const ThemeContext = React.useContext(defaultTheme);

export const useTheme = configureTheme(ThemeContext);
```

3. Wrap your app within the theme context

```jsx
//./App.jsx
// ... imports going here
import {ThemeContext} from "./src/theme";

//... App class going here
render() {
    return (
    <ThemeContext.Provider>
      <App />
    </ThemeContext.Provider>
    );
}
```

And then in your **functional components** (on class components it won't work because of hooks running behind the hood) you can do:

```jsx
// ./src/Foo.component.jsx
import { Text, View } from "react-native";
import { useTheme } from "./theme";

export const Foo = () => {
  const stylings = useTheme(styles);
  return (
    <View>
      <Text style={stylings.bar}>Hello React native</Text>
      <Text style={stylings.foo}>Hello Theme</Text>
    </View>
  );
};

const styles = {
  bar: {
    color: "yellow"
  },
  foo: theme => ({
    color: theme.color
  })
};
```

Optionally, if you want to evaluate the styles according to some value, you can pass a second parameter to useTheme:

```jsx
// ./src/Foo.component.jsx
import { Text, View } from "react-native";
import { useTheme } from "./theme";

export const Foo = () => {
  const stylings = useTheme(styles, { isActive: true });
  return (
    <View>
      <Text style={stylings.bar}>Hello React native</Text>
      <Text style={stylings.foo}>Hello Theme</Text>
    </View>
  );
};

const styles = {
  bar: {
    color: "yellow"
  },
  foo: (theme, params) => ({
    color: params.isActive ? theme.color : "brown"
  })
};
```

## Typescript/flow

```tsx
// ./src/theme.tsx

import * as React from "react";
import { configureTheme, ThemeStyle } from "react-native-theme-style";

const defaultTheme = { color: "red" };
const ThemeContext = React.useContext(defaultTheme);

export const useTheme = configureTheme(ThemeContext);

// Typings support
export type ThemeType<T> = ThemeStyle<{ color: string }, T>;
```

and then:

```tsx
// ./src/Foo.component.jsx
import { Text, View } from "react-native";
import { useTheme, ThemeType } from "./theme";

export const Foo = () => {
  const stylings = useTheme(styles, { isActive: true });
  return (
    <View>
      <Text style={stylings.bar}>Hello React native</Text>
      <Text style={stylings.foo}>Hello Theme</Text>
    </View>
  );
};

const styles: ThemeType<{ isActive: boolean }> = {
  bar: {
    color: "yellow"
  },
  foo: (theme, params) => ({
    color: params.isActive ? theme.color : "brown"
  })
};
```
