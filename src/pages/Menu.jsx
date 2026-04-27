import { Box, Grid, Paper, Stack, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ListProduct from "../components/ListProduct";
import menuData from "../data/menuData";
import { clearCart, selectCartCount, selectSubtotal } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";


function Menu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*const cartItems = useSelector((state) => state.cart.items);*/
  const totalItems = useSelector(selectCartCount);
  const subtotal = useSelector((state) => selectSubtotal(state, menuData));

  const isCartEmpty = totalItems === 0;

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="flex-start"
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            {t("menu.title")}
          </Typography>

          <Grid container spacing={3}>
            {menuData.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ListProduct product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Paper
          elevation={3}
          sx={{
            width: { xs: "100%", md: 320 },
            p: 3,
            borderRadius: 3,
            position: { md: "sticky" },
            top: 24,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5">{t("cart.title")}</Typography>

            <Typography variant="body1">
              {t("cart.totalItems")}: {totalItems}
            </Typography>

            <Typography variant="body1">
              {t("cart.subtotal")}: ₹{subtotal}
            </Typography>

            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch(clearCart())}
              disabled={isCartEmpty}
            >
              {t("cart.clear")}
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff5f00",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#e65600",
                },
              }}
              disabled={isCartEmpty}
                onClick={() => navigate("/home/cart")}
            >
              {t("cart.checkout")}
            </Button>

           

          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export default Menu;