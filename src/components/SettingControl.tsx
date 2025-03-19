
interface SettingControlProps {
  value: number,
  onChange: (newValue: number) => void,
  label: string,
}

export function SettingControl({ value, onChange, label }: SettingControlProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }} className='marg'>
      <span style={{ width: '6em ' }}>{label}</span>
      <button className='pad-s fsize-m' onClick={() => onChange(value - 5)}>-5</button>
      <button className='pad-s fsize-m' onClick={() => onChange(value - 1)}>-1</button>
      <input
        style={{
          flexGrow: 1,
          flexBasis: 0,
          minWidth: '2em',
        }}
        className='pad-s fsize-m'
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <button className='pad-s fsize-m' onClick={() => onChange(value + 1)}>+1</button>
      <button className='pad-s fsize-m' onClick={() => onChange(value + 5)}>+5</button>
    </div>
  )
}
