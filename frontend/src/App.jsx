
import './App.css'
import { Route, Routes, useLocation } from "react-router-dom";
import WelcomeFlow from './pages/WelcomeFlow.jsx'
import Content from './pages/Content'
import Menu from './pages/Menu.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Contact from './pages/Contact.jsx'
import CartReview from './pages/CartReview.jsx'
import Confirmation from './pages/Confirmation.jsx'
import Header from './components/Header.jsx'

function App() {

  const location = useLocation();
  const showHeader = location.pathname !== "/";

 return (
    <>
    {showHeader && <Header />}

    <Routes>
       <Route path="/" element={<WelcomeFlow />} />
       <Route path="/home" element={<Content />} />
       {/*<Route index element={<Menu />} />*/}
       <Route path="menu" element={<Menu />} />
       <Route path="aboutus" element={<AboutUs />} />
       <Route path="contact" element={<Contact />} />
       <Route path="cart" element={<CartReview />} />
       <Route path="confirmation" element={<Confirmation />} />
</Routes>  
    </>
  )
}

export default App
