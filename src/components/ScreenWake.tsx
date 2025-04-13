import { useCallback, useEffect, useState } from 'react';

const WakeLockToggle = () => {
  const [isSupported, setIsSupported] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [wakeLockSentinel, setWakeLockSentinel] = useState<WakeLockSentinel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!('wakeLock' in navigator)) {
      setIsSupported(false);
      setError('Screen Wake Lock API is not supported in this browser.');
    }
  }, []);

  const handleToggle = useCallback(async () => {
    if (!isSupported) return;

    setIsLoading(true);
    setError(null);

    try {
      if (isLocked) {
        if (wakeLockSentinel) {
          await wakeLockSentinel.release();
          setWakeLockSentinel(null);
          setIsLocked(false);
        }
      } else {
        const sentinel = await navigator.wakeLock.request('screen');
        setWakeLockSentinel(sentinel);
        setIsLocked(true);

        sentinel.addEventListener('release', () => {
          setIsLocked(false);
          setWakeLockSentinel(null);
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to acquire/release wake lock.');
      setIsLocked(false);
      setWakeLockSentinel(null);
    } finally {
      setIsLoading(false);
    }
  }, [isLocked, isSupported, wakeLockSentinel]);

  useEffect(() => {
    return () => {
      if (wakeLockSentinel) {
        wakeLockSentinel.release().catch(e => {
          console.error("Error releasing wakelock on unmount", e);
        });
      }
    };
  }, [wakeLockSentinel]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  }}>
        <div>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Prevent Screen Sleep</p>
        </div>
        {error && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            <span style={{ fontWeight: 'bold' }}>Error:</span> {error}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleToggle}
            disabled={!isSupported || isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: isLocked ? 'green' : 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: (isSupported && !isLoading) ? 'pointer' : 'not-allowed',
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isLocked ? 'Turn Off' : 'Turn On'}
          </button>
          {isLoading && <span style={{ color: 'gray' }}>Loading...</span>}
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <p style={{fontSize: '14px', color: 'gray' }}>Is Supported: {isSupported ? 'Yes' : 'No'}</p>
        <p style={{ fontSize: '14px', color: 'gray' }}>
          {isSupported
            ? isLocked
              ? "Screen wake lock is active.  The screen will stay on."
              : "Screen wake lock is inactive. The screen may turn off."
            : "Screen Wake Lock API is not supported in this browser."
          }
        </p>
        {isLocked && (
          <p style={{ color: 'green', fontSize: '14px' }}>Wake lock acquired</p>
        )}
        {!isLocked && isSupported && (
          <p style={{ color: 'gray', fontSize: '14px' }}>Wake lock not active</p>
        )}
      </div>

      {error && (
        <div style={{ backgroundColor: '#fecaca', borderColor: '#f87171', color: '#b91c1c', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
          <p style={{ fontWeight: 'bold' }}>Error</p>
          <p>{error}</p>
        </div>
      )}

      {!isSupported && (
        <div style={{ backgroundColor: '#fecaca', borderColor: '#f87171', color: '#b91c1c', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
          <p style={{ fontWeight: 'bold' }}>Unsupported Browser</p>
          <p>The Screen Wake Lock API is not supported in your browser.</p>
        </div>
      )}
    </div>
  );
};

export default WakeLockToggle;
