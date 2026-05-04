import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Badge,
  Box,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CounterContext } from "../Context/CounterContext.jsx";

function Header() {
  const { count } = useContext(CounterContext);

  const navLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    margin: "0 6px",
  });

  const navButtonStyle = ({ isActive }) => ({
    color: "black",
    fontWeight: isActive ? 700 : 500,
    borderBottom: isActive ? "2px solid black" : "2px solid transparent",
    borderRadius: 0,
  });

  return (
    <AppBar position="static" elevation={1} sx={{ background: "#FF5F00" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "black", fontWeight: 700 }}>
          IchiranMen
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NavLink to="/home/menu" style={navLinkStyle}>
            {({ isActive }) => (
              <Button sx={navButtonStyle({ isActive })}>Menu</Button>
            )}
          </NavLink>

          <NavLink to="/home/aboutus" style={navLinkStyle}>
            {({ isActive }) => (
              <Button sx={navButtonStyle({ isActive })}>About Us</Button>
            )}
          </NavLink>

          <NavLink to="/home/contact" style={navLinkStyle}>
            {({ isActive }) => (
              <Button sx={navButtonStyle({ isActive })}>Contact</Button>
            )}
          </NavLink>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <PersonIcon sx={{ color: "black" }} />
          </IconButton>

          <IconButton>
            <Badge badgeContent={count} color="primary">
              <AddShoppingCartIcon sx={{ color: "black" }} />
            </Badge>
          </IconButton>

          <IconButton>
            <PointOfSaleIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;