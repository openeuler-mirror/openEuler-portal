import { useDebounceFn } from '@vueuse/core';

type FunctionArgs<Args extends any[] = any[], Return = void> = (
  ...args: Args
) => Return;

export const useDebounceSearch = <T extends FunctionArgs>(
  fn: T,
  delay = 300
) => {
  return useDebounceFn(fn, delay);
};
