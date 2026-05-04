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
<<<<<<< HEAD:frontend/src/main.jsx
/*import { OrderProvider } from "./context/OrderContext";*/
=======
>>>>>>> b1146eb29a053387bd66764c879e87ddb19d5c3a:src/main.jsx


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
   


