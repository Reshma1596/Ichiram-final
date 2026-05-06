import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

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
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#ff5f00",
          mb: 3,
          fontWeight: 700,
        }}
      >
        Order Confirmed
      </Typography>

      {order ? (
        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
            background: "#fff",
            border: "1px solid #ffd7b8",
            borderRadius: "12px",
            p: 3,
          }}
        >
          <Typography sx={{ mb: 2, fontWeight: 700 }}>
            Order ID: {order._id}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            Total Items: {order.totalItems}
          </Typography>

          <Typography sx={{ mb: 1 }}>
  Payment Method: {order.paymentMethod}
</Typography>

<Typography sx={{ mb: 2 }}>
  Payment Status: {order.paymentStatus}
</Typography>

          {order.items?.map((item, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ffd7b8",
                borderRadius: "8px",
                background: "#fffaf5",
              }}
            >
              <Typography>Ordered Item: {item.id}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
            </Box>
          ))}

          <Button
            variant="contained"
            onClick={() => navigate("/menu")}
            sx={{
              mt: 2,
              backgroundColor: "#ff5f00",
              "&:hover": { backgroundColor: "#e65600" },
            }}
          >
            Back to Menu
          </Button>
        </Box>
      ) : (
        <Typography sx={{ textAlign: "center" }}>No order data found</Typography>
      )}
    </Box>
  );
};

export default Confirmation;