import { Box, Typography, Button } from '@mui/material';

export default function WelcomeStart({ onNext }) {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to ICHIRAMEN!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Please start your ordering journey
      </Typography>


      <Button 
        variant="contained" 
        size="large"
        onClick={onNext}
        sx={{ minWidth: 220,
          backgroundColor: "#ff5f00",
           color: "#fff",
              fontWeight: 700,
          "&:hover": { backgroundColor: "#e65500" }
        }}
      >
        Start Ordering
      </Button>
    </Box>
  );
}