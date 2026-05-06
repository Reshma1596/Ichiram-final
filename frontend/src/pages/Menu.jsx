import React, { useEffect } from "react";
import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ListProduct from "../components/ListProduct";
import { clearCart, selectCartCount, selectSubtotal } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
  selectMenuItems,
  selectMenuLoading,
  selectMenuError,
} from "../redux/menuSlice";

function Menu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menus = useSelector(selectMenuItems);
  const loading = useSelector(selectMenuLoading);
  const error = useSelector(selectMenuError);
  const wholeMenuState = useSelector((state) => state.menu);

  const totalItems = useSelector(selectCartCount);
  const subtotal = useSelector((state) => selectSubtotal(state, menus));
  const isCartEmpty = totalItems === 0;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        dispatch(fetchMenuStart());
        const res = await fetch("/api/menu", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch menu");
        const data = await res.json();
        dispatch(fetchMenuSuccess(data));
      } catch (err) {
        dispatch(fetchMenuFailure(err.message));
      }
    };

    if (menus.length === 0 && !loading) fetchMenu();
  }, [dispatch, menus.length, loading]);

  if (loading) {
    return <Box sx={{ p: 3 }}><Typography>Loading menu...</Typography></Box>;
  }

  if (error) {
    return <Box sx={{ p: 3 }}><Typography color="error">{error}</Typography></Box>;
  }

  return (
    <Box sx={{ p: 3, minHeight: "100vh", pb: 6 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            {t("menu.title")}
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 3 }}>
            {menus.map((product) => (
              <ListProduct key={product.id || product._id} product={product} />
            ))}
          </Box>
        </Box>

        <Paper elevation={3} sx={{ width: { xs: "100%", md: 320 }, p: 3, borderRadius: 3, position: { xs: "static", md: "sticky" }, top: 24, alignSelf: "flex-start" }}>
          <Stack spacing={2}>
            <Typography variant="h5">{t("cart.title")}</Typography>
            <Typography variant="body1">{t("cart.totalItems")}: {totalItems}</Typography>
            <Typography variant="body1">{t("cart.subtotal")}: ₹{subtotal}</Typography>
            <Button variant="outlined" color="error" onClick={() => dispatch(clearCart())} disabled={isCartEmpty}>
              {t("cart.clear")}
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#ff5f00", color: "#fff", "&:hover": { backgroundColor: "#e65600" } }} disabled={isCartEmpty} onClick={() => navigate("/cart")}>
              {t("cart.checkout")}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

export default Menu;