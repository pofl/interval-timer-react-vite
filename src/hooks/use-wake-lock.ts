// copied from https://github.com/jorisre/react-screen-wake-lock

import * as React from 'react';

const warn = (content: string) => console.warn('[react-screen-wake-lock]: ' + content);

function toError(error: unknown) {
  return error instanceof Error ? error : new Error(String(error));
}

export interface WakeLockOptions {
  onError?: (error: Error) => void;
  onRequest?: () => void;
  onRelease?: EventListener;
  reacquireOnPageVisible?: boolean;
}

export const useWakeLock = ({
  onError,
  onRequest,
  onRelease,
  reacquireOnPageVisible = false,
}: WakeLockOptions | undefined = {}) => {
  const [released, setReleased] = React.useState<boolean | undefined>();
  const wakeLock = React.useRef<WakeLockSentinel | null>(null);

  // https://caniuse.com/mdn-api_wakelock
  const isSupported = typeof window !== 'undefined' && 'wakeLock' in navigator;

  const request = React.useCallback(
    async (type: WakeLockType = 'screen') => {
      const isWakeLockAlreadyDefined = wakeLock.current != null;
      if (!isSupported) {
        return warn("Calling the `request` function has no effect, Wake Lock Screen API isn't supported");
      }
      if (isWakeLockAlreadyDefined) {
        return warn('Calling `request` multiple times without `release` has no effect');
      }

      try {
        wakeLock.current = await navigator.wakeLock.request(type);

        wakeLock.current.onrelease = (e: Event) => {
          // Default to `true` - `released` API is experimental: https://caniuse.com/mdn-api_wakelocksentinel_released
          setReleased((wakeLock.current && wakeLock.current.released) || true);
          onRelease?.(e);
          wakeLock.current = null;
        };

        onRequest?.();
        setReleased((wakeLock.current && wakeLock.current.released) || false);
      } catch (error: unknown) {
        onError?.(toError(error));
      }
    },
    [isSupported, onRequest, onError, onRelease]
  );

  const release = React.useCallback(async () => {
    const isWakeLockUndefined = wakeLock.current == null;
    if (!isSupported) {
      return warn("Calling the `release` function has no effect, Wake Lock Screen API isn't supported");
    }

    if (isWakeLockUndefined) {
      return warn('Calling `release` before `request` has no effect.');
    }
    if (wakeLock.current) {
      await wakeLock.current.release();
    }
  }, [isSupported]);

  React.useEffect(() => {
    if (reacquireOnPageVisible) {
      const handleVisibilityChange = async () => {
        if (wakeLock.current && document.visibilityState === 'visible') {
          try {
            wakeLock.current = await navigator.wakeLock.request('screen');
          } catch (error: unknown) {
            onError?.(toError(error));
          }
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
    return undefined;
  }, [reacquireOnPageVisible, onError]);

  return {
    isSupported,
    request,
    released,
    release,
    type: (wakeLock.current && wakeLock.current.type) || undefined,
  };
};
