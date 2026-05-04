import {Box, Typography} from "@mui/material"
/*import Menu from "./Menu";
import Aboutus from "./AboutUs";  
import Contact from "./Contact";  
import { Route, Routes } from "react-router-dom";
import Counter from "../components/Counter";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "../components/Fallback";*/
import { Outlet } from "react-router-dom"
import Header from '../components/Header.jsx'

function Content(){
  return(<>
  <Header />
  <Box style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", marginTop:"50px"}}>
    <Typography variant="h3" color="#FF5F00">Welcome to IchiranMen</Typography>
    <Typography variant="h6" color="#FF5F00">Experience the authentic taste of Japan with our signature ramen bowls, crafted with rich broth, perfectly cooked noodles, and fresh toppings. Savor the flavors of tradition in every bite!</Typography>
  {/*<Routes>
      <Route path="/" element={
        <ErrorBoundary FallbackComponent={Fallback}> 
        <Counter/> 
        </ErrorBoundary>  }
      />
        
    <Route path="/menu" element={<Menu/>}/>
      <Route path="/aboutus" element={<Aboutus/>}/>
      <Route path="/contact" element={<Contact/>}/>
      
    </Routes>*/}
    <Outlet />
     </Box>


  

  </>)
}
export default Content;