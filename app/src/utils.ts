import { throttle } from 'lodash';

declare type Nullable<T> = T | null;

export const asyncThrottle = <F extends (...args: any[]) => Promise<any>>(
  func: F,
  wait?: number
) => {
  let promise: Nullable<ReturnType<F>> = null;
  const throttled = throttle((resolve, reject, args: Parameters<F>) => {
    func(...args)
      .then(resolve)
      .catch(reject);
  }, wait);

  return (...args: Parameters<F>): ReturnType<F> => {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        throttled(resolve, reject, args);
      }).finally(() => {
        promise = null;
      }) as ReturnType<F>;
    }

    return promise;
  };
};
