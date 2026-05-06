import {Box} from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from '../components/Header.jsx'


function Content(){
  return(<>
  <Header />
   <Box
        sx={{
          minHeight: "calc(100vh - 80px)",
          px: { xs: 2, md: 4 },
          py: 3,
          backgroundColor: "#fffaf3",

        }}
      >


  
    <Outlet />
     </Box>


  

  </>)
}
export default Content;