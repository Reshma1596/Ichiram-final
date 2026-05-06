import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import AdminOrderCard from "../components/admin/AdminOrderCard";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders");
      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      } else {
        console.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, nextStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Failed to update order status");
        return;
      }

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? data : order))
      );
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Admin Orders
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => (
            <AdminOrderCard
              key={order._id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default AdminOrders;