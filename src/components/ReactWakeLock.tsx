type ReactWakeLockProps = {
  isSupported: boolean,
  error: string | null,
  isLocked: boolean,
  handleToggle: () => Promise<void>
};

function ReactWakeLock({ isSupported, error, isLocked, handleToggle }: ReactWakeLockProps) {
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
          <div>Is Supported: {isSupported ? 'Yes' : 'No'}</div>
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
