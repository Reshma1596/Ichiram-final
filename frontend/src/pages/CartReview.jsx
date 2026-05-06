import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  incrementItem,
  decrementItem,
  removeItem,
  selectCartCount,
  selectSubtotal,
  selectCartList,
  clearCart,
} from "../redux/cartSlice";
import { useTranslation } from "react-i18next";
import { placeOrder } from "../redux/ordersSlice";
import { selectMenuItems } from "../redux/menuSlice";


const CartReview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = useSelector(selectMenuItems);
  const totalItems = useSelector(selectCartCount);
  const cartList = useSelector(selectCartList);
  const subtotal = useSelector((state) => selectSubtotal(state, menuItems));

  const handleBackToMenu = () => {
    navigate("/menu");
  };

  const handleProceed = () => {
    const orderData = {
      id: `ORD-${Date.now()}`,
      items: cartList,
      totalItems,
      subtotal,
      orderType: "dine-in",
      customerInfo: {
        name: "Guest",
        tableNo: "T1",
      },
      status: "New",
      createdAt: new Date().toISOString(),
    };

    dispatch(placeOrder(orderData));
    dispatch(clearCart());

    navigate("/confirmation", {
      state: {
        order: orderData,
      },
    });
  };

  if (cartList.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#fff4ea",
          px: 3,
          py: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: "#ff5f00",
            mb: 2,
            fontWeight: 700,
          }}
        >
          Your Cart is Empty
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleBackToMenu}
            sx={{
              backgroundColor: "#ff5f00",
              "&:hover": { backgroundColor: "#e65600" },
            }}
          >
            Back to Menu
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#fff4ea",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, md: 4 },
        overflowX: "hidden",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#ff5f00",
          mb: 3,
          fontWeight: 700,
        }}
      >
        Order Review
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.8fr) minmax(300px, 360px)",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Box>
          {cartList.map((item, index) => {
            const product = menuItems.find((p) => p.id === item.id);
            if (!product) return null;

            const itemTotal = product.price * item.quantity;

            return (
              <Box
                key={`${item.id}-${index}`}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "90px 1fr" },
                  gap: 2,
                  alignItems: "start",
                  border: "1px solid #ffd7b8",
                  borderRadius: "10px",
                  p: 2,
                  mb: 2,
                  background: "#fff",
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={t(product.nameKey)}
                  sx={{
                    width: { xs: "100%", sm: "90px" },
                    height: { xs: "180px", sm: "90px" },
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ffd7b8",
                    background: "#fff7ef",
                    justifySelf: { xs: "stretch", sm: "start" },
                  }}
                />

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, color: "#1f1f1f", fontWeight: 700 }}
                  >
                    {t(product.nameKey)}
                  </Typography>

                  <Typography sx={{ mb: 0.5, color: "#555" }}>
                    Price: ₹{product.price}
                  </Typography>

                  <Typography sx={{ mb: 0.5, color: "#555" }}>
                    Quantity: {item.quantity}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      fontWeight: 700,
                      color: "#ff5f00",
                    }}
                  >
                    Item Total: ₹{itemTotal}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.25,
                      justifyContent: { xs: "flex-start", sm: "flex-end" },
                      mt: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => dispatch(decrementItem(item.id))}
                        sx={{
                          minWidth: "48px",
                          borderColor: "#ffb26b",
                          color: "#ff5f00",
                          backgroundColor: "#fff3e6",
                          "&:hover": {
                            borderColor: "#ff9a3d",
                            backgroundColor: "#ffe7cc",
                          },
                        }}
                      >
                        -
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => dispatch(incrementItem(item.id))}
                        sx={{
                          minWidth: "48px",
                          borderColor: "#ffb26b",
                          color: "#ff5f00",
                          backgroundColor: "#fff3e6",
                          "&:hover": {
                            borderColor: "#ff9a3d",
                            backgroundColor: "#ffe7cc",
                          },
                        }}
                      >
                        +
                      </Button>
                    </Box>

                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => dispatch(removeItem(item.id))}
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            background: "#fff",
            border: "1px solid #ffd7b8",
            borderRadius: "12px",
            p: 2.5,
            position: { xs: "static", md: "sticky" },
            top: { md: 24 },
            maxHeight: { md: "calc(100vh - 48px)" },
            overflowY: { md: "auto" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ mt: 0, mb: 2, color: "#1f1f1f", fontWeight: 700 }}
          >
            Order Summary
          </Typography>

          <Typography sx={{ mb: 1.5, color: "#555", fontSize: "16px" }}>
            Total Items: <strong>{totalItems}</strong>
          </Typography>

          <Typography
            sx={{
              mb: 3,
              color: "#ff5f00",
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            Grand Total: ₹{subtotal}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBackToMenu}
              sx={{
                width: "100%",
                borderColor: "#ffb26b",
                color: "#ff5f00",
                backgroundColor: "#fff3e6",
                "&:hover": {
                  borderColor: "#ff9a3d",
                  backgroundColor: "#ffe7cc",
                },
              }}
            >
              Back to Menu
            </Button>

            <Button
              variant="contained"
              onClick={handleProceed}
              sx={{
                width: "100%",
                backgroundColor: "#ff5f00",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#e65600",
                },
              }}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartReview;