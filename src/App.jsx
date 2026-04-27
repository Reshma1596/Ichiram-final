
import './App.css'
import { Route, Routes } from "react-router-dom";
import WelcomeFlow from './pages/WelcomeFlow.jsx'
import Content from './pages/Content'
import Counter from './components/Counter.jsx'
/*import { CounterProvider } from './Context/CounterContext.jsx'
import Counter from './components/Counter.jsx'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import MenuList from './MenuList'
import ListProduct from './components/ListProduct'
import Checkout from './Checkout';
import viteLogo from '/vite.svg'*/

import Menu from './pages/Menu.jsx'
import Aboutus from './pages/AboutUs.jsx'
import Contact from './pages/Contact.jsx'
import CartReview from './pages/CartReview.jsx'
import Confirmation from './pages/Confirmation.jsx'


function App() {
 

      /*let product1 ={image:"https://media.timeout.com/images/105594173/image.jpg", title:"Chashu Ramen", price:"$25"}

      let product2 ={image:"https://tse2.mm.bing.net/th/id/OIP.4PzliOkBBzzHymKRjSN90AHaE8?w=1200&h=800&rs=1&pid=ImgDetMain&o=7&rm=3", title:"Karage", price:"$17"}

      let product3 ={image:"https://www.tasteofhome.com/wp-content/uploads/2021/05/Matcha-Ice-Cream.jpg?fit=700%2C700", title:"Matcha Icecream", price:"$10"}

      let ListofProduct = [product1,product2,product3]*/
      

  
  return (
    <>
    
    
    {/* <Header/> 
    <div style={{
      display: "flex", 
      flexDirection: "row", 
      gap: "20px", 
      padding: "20px",
      border: "2px solid #ccc",
      borderRadius: "10px",
      maxWidth: "400vh",
      overflowX: "auto",  
      
    }}>*/}
    
        {/*ListofProduct.map((item, index) => {
          return<ListProduct 
            key={index}
            title ={item.title}
            price = {item.price} 
            image={item.image}
            />
        })} */}
   <Routes>
  <Route path="/" element={<WelcomeFlow />} />
  <Route path="/home" element={<Content />} >
  <Route index element={<Menu />} />
 <Route path="menu" element={<Menu />} />
  <Route path="aboutus" element={<Aboutus />} />
  <Route path="contact" element={<Contact />} />
  <Route path="cart" element={<CartReview />} />
  <Route path="confirmation" element={<Confirmation />} />  
   </Route>
</Routes>
      
    
   
     

      
    </>
  )
}

export default App
