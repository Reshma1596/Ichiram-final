import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Order Confirmed
        </Typography>

        <Typography variant="body1">
          Your order has been placed successfully.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff5f00",
            "&:hover": { backgroundColor: "#e65600" },
          }}
          onClick={() => navigate("/home/menu")}
        >
          Back to Menu
        </Button>
      </Stack>
    </Box>
  );
}

export default Confirmation;
