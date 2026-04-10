import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import NetworkErrorPage from './pages/NetworkErrorPage.jsx'
import { CounterProvider } from './Context/CounterContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={NetworkErrorPage}>
        <CounterProvider>
          <App /> 
          
        </CounterProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
   


