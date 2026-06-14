import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Records } from './Records'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Records/>
  </StrictMode>,
)
