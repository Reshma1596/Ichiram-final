import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearAdminSession, getAdminSession } from "../utils/storage";

function AdminPage() {
  const navigate = useNavigate();
  const admin = getAdminSession();

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

  const handleLogout = () => {
    clearAdminSession();
    navigate("/admin-login");
  };

  const handleStatusChange = async (orderId, nextStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: nextStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Failed to update status");
        return;
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? data : order
        )
      );
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "Pending") return "Preparing";
    if (currentStatus === "Preparing") return "Ready";
    if (currentStatus === "Ready") return "Served";
    return "Served";
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Admin Orders
          </Typography>
          <Typography sx={{ color: "#666" }}>
            Logged in as: {admin.adminUsername}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: "#ff5f00",
            "&:hover": { backgroundColor: "#e65600" },
          }}
        >
          Logout
        </Button>
      </Stack>

      {loading ? (
        <Typography>Loading orders...</Typography>
      ) : orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => (
            <Card key={order._id} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Order #{order._id.slice(-6).toUpperCase()}
                </Typography>

                <Typography sx={{ mb: 0.5 }}>
                  Customer: {order.customerName || "Guest"}
                </Typography>

                <Typography sx={{ mb: 0.5 }}>
                  Phone: {order.phone || "-"}
                </Typography>

                <Typography sx={{ mb: 0.5 }}>
                  Table: {order.tableNumber || "-"}
                </Typography>

                <Typography sx={{ mb: 0.5 }}>
                  Dining: {order.diningType || "-"}
                </Typography>

                <Typography sx={{ mb: 0.5 }}>
                  Total: ₹{order.totalAmount}
                </Typography>

                <Typography sx={{ mb: 1.5, fontWeight: 600 }}>
                  Status: {order.status}
                </Typography>

                <Box sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>Items:</Typography>
                  {order.items?.map((item, index) => (
                    <Typography key={index}>
                      {item.name} x {item.quantity}
                    </Typography>
                  ))}
                </Box>

                {order.status !== "Served" && (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      handleStatusChange(order._id, getNextStatus(order.status))
                    }
                  >
                    Mark as {getNextStatus(order.status)}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default AdminPage;