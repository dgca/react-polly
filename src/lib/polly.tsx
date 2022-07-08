import React from 'react';
import { Merge } from 'type-fest';

/**
 * @desc Utility type for getting props type of React component.
 * It takes `defaultProps` into an account - making props with defaults optional.
 * @see {@link https://github.com/sindresorhus/type-fest/blob/79f6b6239b270abc1c1cd20812a00baeb7f9fb57/source/merge.d.ts}
 */
type PropsOf<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<T, React.ComponentProps<T>>;

type RefTypeOf<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

type PolymorphicProps<C extends React.ElementType, Props = {}> = Merge<
  PropsOf<C>,
  Props
> & {
  as?: C;
  ref?: RefTypeOf<C>;
};

interface PollyComponentWithRef<
  DefaultType extends React.ElementType,
  Props = {}
> {
  <C extends React.ElementType = DefaultType>(
    props: PolymorphicProps<C, Props>,
    ref: RefTypeOf<C>
  ): React.ReactElement | null;
  displayName?: string | undefined;
}

export function polly<DefaultType extends React.ElementType, Props = {}>(
  baseComponent: PollyComponentWithRef<DefaultType, Props>
) {
  // @ts-ignore: Unfortunately, we can't derive the right ref type to pass
  // to React.forwardRef at this time, so we'll ignore this warning and force the
  // type of `WrappedComponent`.
  const WrappedComponent: typeof baseComponent =
    React.forwardRef(baseComponent);

  WrappedComponent.displayName = baseComponent.name || 'Polly';

  return WrappedComponent;
}
