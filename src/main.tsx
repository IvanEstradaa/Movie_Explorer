import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { FavoritesProvider } from './context/FavoritesContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <FavoritesProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
          </FavoritesProvider>
      </BrowserRouter>
  </StrictMode>,
)
