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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div>
            <b>Screen Sleep Prevention</b>
          </div>
          {error && (
            <p style={{ color: 'red' }}>
              <b>Error:</b> {error}
            </p>
          )}
          <div style={{ color: 'gray' }}>Is Supported: {isSupported ? 'Yes' : 'No'}</div>
          <div style={isLocked ? { color: 'green' } : {}}>Is Active: {isLocked ? 'Yes' : 'No'}</div>
        </div>
        <button
          onClick={handleToggle}
          disabled={!isSupported}
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

      <div>
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
