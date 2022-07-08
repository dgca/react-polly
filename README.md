# `react-polly`

 🛠 **polymorphic** _component factory_ for React ⚛️

**[Bootstrapped with `dts-cli`](https://github.com/weiran-zsd/dts-cli)**

## Status

[![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#experimental)

This library is pre-release, as I'm still trying to work out the best API for this. Feedback is very apprecaited! If you have any ideas, please submit an issue or open a PR 🙏

## What it does:

`react-polly` provides a quick and easy way to create polymorphic components—that is, components that can return different underlying elements based on an `as` prop passed in by the caller.

Additionally, it handles ref forwarding via `React.forwardRef`, and it manages merging additional prop types based on the provided `as` prop.

## How to use it:

_Note: This assumes you're using TypeScript._

**Install:** `npm install react-polly` or `yarn add react-poly`

`polly` is a generic function that takes two type arguments and one regular function argument.

The type arguments specify the default element type your component will return, and the prop types that your component will handle.

The main function argument is your component definition.

Note that although you must use the same default element type as the first type argument, and as the default value for your `as` prop.

```tsx
import polly from 'react-polly';

type TextProps = {
  color?: "black" | "red" | "blue";
  children: React.ReactNode;
};

// Here we create a polymorphic <Text> component that returns a <span> by default.
const Text = polly<"span", TextProps>(function Text(
  {
    // You must provide the same default value for the `as` prop as you
    // passed to the first generic type argument.
    // You must also rename the `as` prop to an Uppercase word cause React
    // component names must be capitalied.
    as: Component = "span",
    color = "black",
    children,
    ...rest
  },
  ref?
) {
  return (
    <Component
      {...rest}
      ref={ref}
      style={{
        color
      }}
    >
      {children}
    </Component>
  );
});

type YellerProps = {
  children: React.ReactNode;
  exclamationCount: number;
};

// This is a regular component for demo purposes below.
function Yeller({ children, exclamationCount, ...rest }: YellerProps) {
  return (
    <span {...rest}>
      {children}
      {Array.from({ length: exclamationCount })
        .map(() => "!")
        .join("")}
    </span>
  );
}

function Demo() {
  return (
    <div className="app">
      <h1>react-polly</h1>
      {/* This will render a <span> element */}
      <Text>Hello! I'm a polymorphic element.</Text>
      <br />
      {/* This will render a <strong> tag */}
      <Text color="red" as="strong">
        I can render any type of element that you specify via my `as` prop.
      </Text>
      <br />
      {/* This will render a Yeller component */}
      <Text as={Yeller} exclamationCount={10} color="blue">
        I can even render as other React Components
      </Text>
    </div>
  );
}
```

## Appendix

* Shoutout to Ben Ilegbodu for [this blog post](https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/) which was super useful when writing this library.
