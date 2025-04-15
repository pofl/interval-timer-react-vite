import { useMemo, useState } from "react";
import { useWakeLock } from "../hooks/use-wake-lock";

function ReactWakeLock() {
  const [error, setError] = useState<string | null>(null);
  const { isSupported, released, request, release } = useWakeLock({
    onError: (error) => {
      alert('An error happened 💥')
      setError(error.message || 'An unknown error occurred');
    },
    reacquireOnPageVisible: true,
  });

  const isLocked = useMemo(() => {
    if (released === undefined) return false;
    return !released;
  }, [released]);

  const handleToggle = async () => {
    if (isLocked) {
      await release();
    } else {
      await request();
    }
  };

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
            disabled={!isSupported }
            style={{
              padding: '10px 20px',
              backgroundColor: isLocked ? 'green' : 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: (isSupported) ? 'pointer' : 'not-allowed',
            }}
          >
            {isLocked ? 'Turn Off' : 'Turn On'}
          </button>
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
}

export default ReactWakeLock;
