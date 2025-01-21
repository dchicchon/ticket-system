import { useState } from 'react';
import Link from '@mui/material/Link';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { post } from '@/utils/api';
import { Link as RouterLink } from 'react-router';
import { useStore } from '@/utils/store';

export default function Signup() {
  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const errorMessage = useStore((state) => state.errorMessage);
  const setUser = useStore((state) => state.setUser);

  const signup = async () => {
    console.log({
      username,
      password,
      confirmPassword,
    });
    if (password !== confirmPassword) {
      errorMessage('Password and confirm password must match');
      return;
    }
    const data = await post('/auth/signup', { username, password });
    setUser(data);
  };

  return (
    <Container
      sx={{
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      maxWidth="lg"
    >
      <Paper>
        <Box
          sx={{
            p: 1,
            background: '#1976d2',
          }}
        >
          <Typography
            sx={{
              color: 'white',
            }}
            variant="h5"
          >
            Ticket System
          </Typography>
        </Box>
        <Grid sx={{ p: 5 }} container spacing={2}>
          <Grid size={12}>
            <Typography variant="h5">Signup</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              label="username"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              label="password"
            />
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              variant="outlined"
              label="confirm password"
            />
          </Grid>
          <Grid size={3}>
            <Button variant="outlined" onClick={signup}>
              Submit
            </Button>
          </Grid>
          <Grid size={9}>
            <Link component={RouterLink} to="/login">
              Have an account? Login here
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
