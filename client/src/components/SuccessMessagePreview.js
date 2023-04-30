import { useEffect, useState } from 'react';
import { Alert, Box, LinearProgress, Snackbar, Stack } from '@mui/material';

export default function CustomizedSnackbars({ message }) {
  let [open, setOpen] = useState(true)
  const [progress, setProgress] = useState(20);

  const handleClose = (_event) => {
    setOpen(false);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 20 : prevProgress + 10));
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Box>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
          <LinearProgress variant="determinate" color='success' value={progress} />
        </Box>
      </Snackbar>
    </Stack>
  );
}
