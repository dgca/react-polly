import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { polly } from '../src/lib/polly';

type TextProps = {
  color?: 'black' | 'red' | 'blue';
  children: React.ReactNode;
};

const Text = polly<'span', TextProps>(function Text(
  { as: Component = 'span', color = 'black', children, ...rest },
  ref?
) {
  return (
    <Component
      {...rest}
      ref={ref}
      style={{
        color,
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

function Yeller({ children, exclamationCount, ...rest }: YellerProps) {
  return (
    <span {...rest}>
      {children}
      {Array.from({ length: exclamationCount })
        .map(() => '!')
        .join('')}
    </span>
  );
}

function App() {
  return (
    <div className="app">
      <h1>react-polly</h1>
      <Text>Hello! I'm a polymorphic element.</Text>
      <br />
      <Text color="red" as="strong">
        I can render any type of element that you specify via my `as` prop.
      </Text>
      <br />
      <Text as={Yeller} exclamationCount={10} color="blue">
        I can even render as other React Components
      </Text>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
