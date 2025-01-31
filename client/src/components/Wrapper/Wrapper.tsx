import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Navbar from '../Navbar';
import { Outlet, useNavigate } from 'react-router';
import { useStore } from '@/utils/store';
import { useEffect } from 'react';
import { get } from '@/utils/api';

const Wrapper = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const token = useStore(state => state.token)
  const setUser = useStore((state) => state.setUser);
  const severity = useStore((state) => state.severity);
  const closeMessage = useStore((state) => state.closeMessage);
  const openBar = useStore((state) => state.openBar);
  const message = useStore((state) => state.message);

  const getUser = async () => {
    const data = await get('/auth/currentuser');
    setUser(data.user);
  };

  useEffect(() => {
    getUser();
  }, [token]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [user]);

  const handleClose = (_, reason?: SnackbarCloseReason) => {
    if (reason == 'clickaway') {
      return;
    }
    closeMessage();
  };

  return (
    <>
      {user && <Navbar />}
      {/* if user exists should we place a navbar here? */}
      <Outlet />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openBar}
        autoHideDuration={6000}
        onClose={handleClose}
        // action={action}
      >
        <Alert severity={severity}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>{message}</Typography>
            <IconButton
              color="inherit"
              aria-label="close"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
};
export default Wrapper;
