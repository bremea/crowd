import { errors } from './errors.js';

// Made similar to node's internal error creation

export type ErrorCode = keyof typeof errors;

export type ErrorName = `Error [${ErrorCode}]`;

export class DError extends Error {
  public readonly code: ErrorCode;
  public readonly name: ErrorName;

  constructor(
    code: ErrorCode,
    ...args: Parameters<typeof errors[typeof code]>
  ) {
    super(DError.message(code, args));
    this.code = code;
    this.name = <ErrorName>`Error [${code}]`;
    if (Error.captureStackTrace) Error.captureStackTrace(this, DError);
  }

  private static message(
    code: ErrorCode,
    args: Parameters<typeof errors[typeof code]>
  ): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return errors[code](...args);
  }
}
