import {AppBar, Button, Toolbar, Typography, Badge,Box} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Link } from "react-router-dom";
import {useContext} from "react";
import { CounterContext } from "../Context/CounterContext.jsx";

function Header(){
  const { count } = useContext(CounterContext);
  return(<>
  <AppBar position="static">
    <Toolbar style={{background:"#FF5F00", display:"flex", justifyContent:"space-between"}}>
      <Typography variant="h6" color="black">IchiranMen </Typography>

      <Box>
       
        <Link to="/menu">
          <Button style={{ color: "black" }}>Menu</Button>
        </Link>
        <Link to="/aboutus">
          <Button style={{ color: "black" }}>Aboutus</Button>
        </Link>
        <Link to="/contact">
          <Button style={{ color: "black" }}>Contact</Button>
        </Link>
     </Box>
     <Box style={{display:"flex", gap:"26px"}}>
       <PersonIcon style={{color:"Black"}}/>

       <Badge badgeContent={count} color="primary"> <AddShoppingCartIcon style={{color:"Black"}}/> </Badge>

       <PointOfSaleIcon style={{color:"Black"}}/>

     </Box>
    </Toolbar>
  </AppBar>
  </>)
}
export default Header;
 
