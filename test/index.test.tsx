import * as React from 'react';
import * as ReactDOM from 'react-dom';
import polly from '../src/index';

type TextProps = {
  color?: 'black' | 'red' | 'blue';
  children: React.ReactNode;
};

const Text = polly<'span', TextProps>(function Text(
  { as, color = 'black', children, ...rest },
  ref?
) {
  const Component = as ?? 'span';
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

describe('polly', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Text>Hello world!</Text>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
