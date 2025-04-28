import React, { useState } from 'react';
import { Snackbar, Alert, ThemeProvider } from '@mui/material';
import theme from '../theme';

function InfoSnackbar({ message, autoHideDuration = 5000 }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: '4vh' }}
        autoHideDuration={autoHideDuration}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          icon={false}
          sx={{
            width: '100%',
            bgcolor: 'primary.main',
            color: 'white',
            fontSize: '0.9rem',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default InfoSnackbar;
