import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CounterContext } from "../Context/CounterContext.jsx";
import {
  clearGuestData,
  getGuestFromLocal,
  getSessionPrefs,
} from "../utils/storage";

function Header() {
  const { count } = useContext(CounterContext);
  const navigate = useNavigate();
  const guest = getGuestFromLocal();
  const prefs = getSessionPrefs();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearGuestData();
    handleClose();
    navigate("/login");
  };

  const navLinkStyle = () => ({
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
        <Typography
          variant="h6"
          sx={{ color: "black", fontWeight: 700, cursor: "pointer" }}
          onClick={() => navigate("/menu")}
        >
          IchiranMen
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NavLink to="/menu" style={navLinkStyle}>
            {({ isActive }) => (
              <Button sx={navButtonStyle({ isActive })}>Menu</Button>
            )}
          </NavLink>

          <NavLink to="/aboutus" style={navLinkStyle}>
            {({ isActive }) => (
              <Button sx={navButtonStyle({ isActive })}>About Us</Button>
            )}
          </NavLink>

          <NavLink to="/contact" style={navLinkStyle}>
            {({ isActive }) => (
              <Button sx={navButtonStyle({ isActive })}>Contact</Button>
            )}
          </NavLink>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handleProfileClick}>
            <PersonIcon sx={{ color: "black" }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem disabled>Name: {guest.name || "-"}</MenuItem>
            <MenuItem disabled>Phone: {guest.phone || "-"}</MenuItem>
            <Divider />
            <MenuItem disabled>Dining Type: {prefs.diningType || "-"}</MenuItem>
            <MenuItem disabled>Party Size: {prefs.partySize || "-"}</MenuItem>
            <MenuItem disabled>Language: {prefs.language || "-"}</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          <IconButton onClick={() => navigate("/cart")}>
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