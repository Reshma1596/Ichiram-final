
import './App.css'
import { Route, Routes } from "react-router-dom";
import WelcomeFlow from './pages/WelcomeFlow.jsx'
import Content from './pages/Content'
import Counter from './components/Counter.jsx'
import Menu from './pages/Menu.jsx'
import Aboutus from './pages/AboutUs.jsx'
import Contact from './pages/Contact.jsx'
import CartReview from './pages/CartReview.jsx'
import Confirmation from './pages/Confirmation.jsx'
<<<<<<< HEAD:frontend/src/App.jsx
=======


>>>>>>> b1146eb29a053387bd66764c879e87ddb19d5c3a:src/App.jsx
function App() {
 return (
    <>
    <Routes>
  <Route path="/" element={<WelcomeFlow />} />
  <Route path="/home" element={<Content />} >
  <Route index element={<Menu />} />
 <Route path="menu" element={<Menu />} />
  <Route path="aboutus" element={<Aboutus />} />
  <Route path="contact" element={<Contact />} />
  <Route path="cart" element={<CartReview />} />
<<<<<<< HEAD:frontend/src/App.jsx
  <Route path="confirmation" element={<Confirmation />} /> 
  </Route>
=======
  <Route path="confirmation" element={<Confirmation />} />  
   </Route>
>>>>>>> b1146eb29a053387bd66764c879e87ddb19d5c3a:src/App.jsx
</Routes>
      
    
   
     

      
    </>
  )
}

export default App
