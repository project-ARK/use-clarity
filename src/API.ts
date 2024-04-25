import { Clarity } from './types/clarity-js';

/**
 * Safely exposes `window.clarity` and passes the arguments to the instance
 *
 * @param method method passed to the `window.clarity` instance
 * @param args arguments passed to the `window.clarity` instance
 *
 * @see {@link https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api}
 */
const ClarityAPI = <F extends keyof Clarity>(
  method: F,
  ...args: Parameters<Clarity[F]>
) => {
  if (window.clarity as Clarity) {
    return window.clarity.apply(null, [method, ...args]);
  } else {
    console.error(`Clarity instance is not initialized yet`);
  }
};

export default ClarityAPI;
