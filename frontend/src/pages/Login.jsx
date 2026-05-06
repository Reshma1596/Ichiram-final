import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveGuestToLocal, getSessionPrefs } from "../utils/storage";

function Login() {
  const navigate = useNavigate();
  const sessionPrefs = getSessionPrefs();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const nameRegex = /^[A-Za-z. ]{1,250}$/;
  const phoneRegex = /^\d{10}$/;

  const handleNameChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^A-Za-z. ]/g, "");
    if (value.length > 250) {
      value = value.slice(0, 250);
    }

    setName(value);

    if (!value.trim()) {
      setNameError("Name is required");
    } else if (!nameRegex.test(value)) {
      setNameError("Name can contain only letters, spaces, and periods");
    } else {
      setNameError("");
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setPhone(value);

    if (!value) {
      setPhoneError("Phone number is required");
    } else if (!phoneRegex.test(value)) {
      setPhoneError("Phone number must be exactly 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleContinue = async () => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setNameError("Name is required");
      return;
    }

    if (!nameRegex.test(trimmedName)) {
      setNameError("Name can contain only letters, spaces, and periods");
      return;
    }

    if (!trimmedPhone) {
      setPhoneError("Phone number is required");
      return;
    }

    if (!phoneRegex.test(trimmedPhone)) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    saveGuestToLocal({
      name: trimmedName,
      phone: trimmedPhone,
    });

    try {
      await fetch("http://localhost:3000/api/auth/guest-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          diningType: sessionPrefs.diningType,
          partySize: sessionPrefs.partySize,
          language: sessionPrefs.language,
        }),
      });
    } catch (error) {
      console.error("Guest login save failed:", error);
    }

    navigate("/menu");
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
          Guest Login
        </Typography>

        <Typography sx={{ mb: 1.5, color: "#555" }}>
          Dining Type: <strong>{sessionPrefs.diningType || "-"}</strong>
        </Typography>

        <Typography sx={{ mb: 1.5, color: "#555" }}>
          Party Size: <strong>{sessionPrefs.partySize || "-"}</strong>
        </Typography>

        <Typography sx={{ mb: 3, color: "#555" }}>
          Language: <strong>{sessionPrefs.language || "-"}</strong>
        </Typography>

        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={handleNameChange}
          error={!!nameError}
          helperText={nameError}
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 250 }}
        />

        <TextField
          fullWidth
          label="Phone"
          value={phone}
          onChange={handlePhoneChange}
          error={!!phoneError}
          helperText={phoneError}
          sx={{ mb: 3 }}
          inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleContinue}
          sx={{
            backgroundColor: "#ff5f00",
            fontWeight: 700,
            "&:hover": { backgroundColor: "#e65600" },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export default Login;