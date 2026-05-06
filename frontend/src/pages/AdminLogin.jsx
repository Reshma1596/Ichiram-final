import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveAdminSession } from "../utils/storage";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleAdminLogin = async () => {
    setErrorText("");

    if (!username.trim() || !password.trim()) {
      setErrorText("Enter username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorText(data.message || "Admin login failed");
        return;
      }

      saveAdminSession({
        username: data.admin.username,
      });

      navigate("/admin");
    } catch (error) {
      console.error("Admin login error:", error);
      setErrorText("Unable to connect to admin login");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff4ea",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          border: "1px solid #ffd7b8",
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, color: "#ff5f00", fontWeight: 700, textAlign: "center" }}
        >
          Admin Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        {errorText && (
          <Typography sx={{ color: "red", mb: 2, fontSize: "0.95rem" }}>
            {errorText}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleAdminLogin}
          sx={{
            backgroundColor: "#ff5f00",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#e65600" },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default AdminLogin;