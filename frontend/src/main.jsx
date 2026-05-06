import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import NetworkErrorPage from './pages/NetworkErrorPage.jsx'
import { CounterProvider } from './Context/CounterContext.jsx'
import "./i18n";
import { Provider } from "react-redux";
import store from "./redux/store";


console.log("STORE STATE NOW:", JSON.stringify(store.getState(), null, 2))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>          
      <ErrorBoundary FallbackComponent={NetworkErrorPage}>
        <CounterProvider>
           <App /> 
          </CounterProvider>
      </ErrorBoundary>
        </Provider>
    </BrowserRouter>
  </StrictMode>,
);
   


