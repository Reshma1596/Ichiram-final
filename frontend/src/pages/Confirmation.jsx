import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import menuData from "../data/menuData";
import { useTranslation } from "react-i18next";

function Confirmation() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#fff4ea",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: "420px", width: "100%" }}>
          <Typography variant="h5" fontWeight={700}>
            No order found
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/menu")}
            sx={{
              backgroundColor: "#ff5f00",
              "&:hover": { backgroundColor: "#e65600" },
            }}
          >
            Back to Menu
          </Button>
        </Stack>
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
      }}
    >
      <Stack
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "720px", md: "980px", lg: "1200px" },
          margin: "0 auto",
        }}
      >
        <Typography variant="h4" fontWeight={700} sx={{ color: "#111" }}>
          Order Confirmed
        </Typography>

        <Typography variant="body1" sx={{ color: "#333" }}>
          Your order has been placed successfully.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Card
            sx={{
              borderRadius: "12px",
              border: "1px solid #ffd7b8",
              boxShadow: "none",
              height: "100%",
            }}
          >
            <CardContent>
              <Stack spacing={1}>
                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{ color: "#ff5f00" }}
                >
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body2">Order Type: {order.orderType}</Typography>
                <Typography variant="body2">
                  Total Items: {order.totalItems}
                </Typography>
                <Typography variant="body2">Subtotal: ₹{order.subtotal}</Typography>
                <Typography variant="body2">Status: {order.status}</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              borderRadius: "12px",
              border: "1px solid #ffd7b8",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Ordered Items
              </Typography>

              <Stack spacing={2} sx={{ maxHeight: "420px", overflowY: "auto", pr: 1 }}>
                {order.items.map((item, index) => {
                  const product = menuData.find((p) => p.id === item.id);

                  return (
                    <Box key={`${item.id}-${index}`}>
                      <Typography variant="body1" fontWeight={600}>
                        {product ? t(product.nameKey) : item.id}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#555" }}>
                        Quantity: {item.quantity}
                      </Typography>
                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/menu")}
          sx={{
            alignSelf: { xs: "stretch", md: "flex-start" },
            minWidth: { xs: "100%", sm: "220px" },
            backgroundColor: "#ff5f00",
            fontWeight: 700,
            py: 1.4,
            "&:hover": { backgroundColor: "#e65600" },
          }}
        >
          Back to Menu
        </Button>
      </Stack>
    </Box>
  );
}

export default Confirmation;