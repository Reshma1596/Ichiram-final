import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const initialFormData = {
  name: "",
  price: "",
  category: "",
  image: "",
  description: "",
};

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  const fetchMenu = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/menu");
      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Failed to fetch menu");
        return;
      }

      setMenuItems(data);
    } catch (error) {
      console.error("Fetch menu error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || "",
      price: item.price || "",
      category: item.category || "",
      image: item.image || "",
      description: item.description || "",
    });
  };

  const handleSaveMenu = async () => {
    if (!formData.name.trim() || !String(formData.price).trim()) {
      alert("Name and price are required");
      return;
    }

    const url = editingId
      ? `http://localhost:3000/api/menu/${editingId}`
      : "http://localhost:3000/api/menu";

    const method = editingId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Failed to save menu item");
        alert(data.message || "Failed to save menu item");
        return;
      }

      if (editingId) {
        setMenuItems((prev) =>
          prev.map((item) => (item.id === editingId ? data : item))
        );
      } else {
        setMenuItems((prev) => [data, ...prev]);
      }

      resetForm();
    } catch (error) {
      console.error("Save menu error:", error);
      alert("Save menu failed");
    }
  };

  const handleDeleteMenu = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/menu/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Failed to delete menu item");
        alert(data.message || "Failed to delete menu item");
        return;
      }

      setMenuItems((prev) => prev.filter((item) => item.id !== id));

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Delete menu error:", error);
      alert("Delete failed");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Admin Menu
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            {editingId ? "Edit Menu Item" : "Add Menu Item"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSaveMenu}
              sx={{
                backgroundColor: "#ff5f00",
                "&:hover": { backgroundColor: "#e65600" },
              }}
            >
              {editingId ? "Update Item" : "Add Item"}
            </Button>

            {editingId && (
              <Button variant="outlined" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {loading ? (
        <Typography>Loading menu...</Typography>
      ) : menuItems.length === 0 ? (
        <Typography>No menu items yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {menuItems.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {item.name}
                    </Typography>
                    <Typography>₹{item.price}</Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {item.category || "Uncategorized"}
                  </Typography>

                  {item.description && (
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "text.secondary" }}
                    >
                      {item.description}
                    </Typography>
                  )}

                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteMenu(item.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default AdminMenu;