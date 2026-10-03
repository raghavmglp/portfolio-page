import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

localStorage.removeItem('theme')
import '@fontsource/jetbrains-mono'
import '@fontsource/space-grotesk'
import '@fontsource/geist'
import '@fontsource/ibm-plex-sans'
import '@fontsource/manrope'
import '@fontsource/inter'
import '@fontsource/dm-sans'
import './index.css'
import App from './App.tsx'
import { Provider } from "@/components/ui/provider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
