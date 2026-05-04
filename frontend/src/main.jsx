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
/*import { OrderProvider } from "./context/OrderContext";*/


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>          
      <ErrorBoundary FallbackComponent={NetworkErrorPage}>
        <CounterProvider>
          {/* <OrderProvider></OrderProvider> */}
           <App /> 
          </CounterProvider>
      </ErrorBoundary>
        </Provider>
    </BrowserRouter>
  </StrictMode>,
);
   


