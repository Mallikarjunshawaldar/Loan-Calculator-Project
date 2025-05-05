import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
  return (
   <Box sx={{mt: 10, textAlign: 'center'}}>
          <Typography variant="h4" sx={{ mb: 4 }}>
              Something went wrong in the application.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Go to Home
          </Button>
   </Box>
  );
}

export default ErrorPage;
