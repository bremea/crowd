export type int = number;

export type bool = 0 | 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;

export type LimitedQuery<
  R extends Row,
  N extends number = 1,
  Arr extends R[] = [R]
> = Arr['length'] extends N ? Arr : LimitedQuery<R, N, [R, ...Arr]>;

export type Query<R extends Row, N extends number = 0> = N extends 0
  ? R[]
  : LimitedQuery<R, N>;

export type SelectFrom<R extends Row, C extends keyof R> = { [K in C]: R[K] };

export type UpdateValues<
  T extends readonly (keyof I)[],
  I extends Row,
  A extends unknown[] = []
> = T['length'] extends A['length']
  ? A
  : UpdateValues<T, I, [...A, I[T[A['length']]]]>;
