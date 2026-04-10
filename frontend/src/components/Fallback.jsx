import { Box, Typography, Button } from "@mui/material";

function Fallback({ error, resetErrorBoundary }) {
  return (
    <Box sx={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h4" color="error">
        Something went wrong ⚠️
      </Typography>

      <Typography sx={{ marginTop: "20px" }}>
        {error.message}
      </Typography>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#FF5F00", marginTop: "20px" }}
        onClick={resetErrorBoundary}
      >
        Try Again
      </Button>
    </Box>
  );
}

export default Fallback;