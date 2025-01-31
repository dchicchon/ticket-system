import { Container, Paper, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { post } from '@/utils/api';
import { useState } from 'react';
import { useStore } from '@/utils/store';

import Link from '@/components/Link';

export default function Login() {
  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);

  const login = async () => {
    const body = {
      username,
      password,
    };
    const data = await post('/auth/login', body, { debug: true });
    setToken(data.token);
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
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              label="username"
            ></TextField>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              label="password"
            ></TextField>
          </Grid>
          <Grid size={3}>
            <Button variant="outlined" onClick={login}>
              Submit
            </Button>
          </Grid>
          <Grid size={9}>
            <Link to="/signup">Don't have an account? Sign up here</Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
