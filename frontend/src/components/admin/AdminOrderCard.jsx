import React from "react";
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";

function getNextStatus(currentStatus) {
  if (currentStatus === "confirmed") return "preparing";
  if (currentStatus === "preparing") return "ready";
  if (currentStatus === "ready") return "delivered";
  return "delivered";
}

function getStatusColor(status) {
  if (status === "confirmed") return "warning";
  if (status === "preparing") return "info";
  if (status === "ready") return "success";
  if (status === "delivered") return "default";
  return "default";
}

function AdminOrderCard({ order, onStatusChange }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Order #{order._id?.slice(-6).toUpperCase()}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {order.customerName || "Guest"} • {order.phone || "No phone"}
            </Typography>
          </Box>

          <Chip
            label={order.status || "confirmed"}
            color={getStatusColor(order.status)}
            variant="filled"
          />
        </Stack>

        <Stack spacing={0.7} sx={{ mb: 2 }}>
          <Typography>Table: {order.tableNumber || "-"}</Typography>
          <Typography>Dining: {order.diningType || "-"}</Typography>
          <Typography>Total items: {order.totalItems || 0}</Typography>
          <Typography>Total amount: ₹{order.totalAmount || 0}</Typography>
          <Typography>
            Payment: {order.paymentMethod || "cash"} / {order.paymentStatus || "pending"}
          </Typography>
        </Stack>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>Items</Typography>
          {(order.items || []).map((item, index) => (
            <Typography key={index} variant="body2">
              {item.id} × {item.quantity}
            </Typography>
          ))}
        </Box>

        {order.status !== "delivered" && (
          <Button
            variant="contained"
            onClick={() => onStatusChange(order._id, getNextStatus(order.status || "confirmed"))}
            sx={{
              backgroundColor: "#ff5f00",
              "&:hover": { backgroundColor: "#e65600" },
            }}
          >
            Mark as {getNextStatus(order.status || "confirmed")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminOrderCard;