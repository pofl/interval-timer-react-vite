import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IntervalTimer } from './components/IntervalTimer.tsx'
import './interval.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntervalTimer />
  </StrictMode>,
)
