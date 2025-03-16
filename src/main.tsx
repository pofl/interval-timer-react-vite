import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './interval.css'
import { IntervalTimer } from './IntervalTimer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntervalTimer />
  </StrictMode>,
)
