import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { IntervalTimer } from './IntervalTimer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntervalTimer />
  </StrictMode>,
)
