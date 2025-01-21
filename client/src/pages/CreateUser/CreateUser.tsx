import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Page from '@/components/Page/Page';
import { useState } from 'react';
import { useStore } from '@/utils/store';
import { post } from '@/utils/api';

export default function CreateUser(props) {
  const errorMessage = useStore((state) => state.errorMessage);
  const successMessage = useStore((state) => state.successMessage);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('customer');

  const createUser = async () => {
    if (username.length < 5) {
      errorMessage('Username must be more than 5 characters');
    }
    const result = await post('/users', { username, role });
    if (result) {
      successMessage('Successfully Created User');
    }
  };

  return (
    <Page>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Create User</Typography>
        <Stack maxWidth={'50%'} gap={2}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
          />
          <InputLabel>Role</InputLabel>
          <Select label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
          </Select>
          <Button onClick={createUser} variant="outlined">
            Create User
          </Button>
        </Stack>
      </Paper>
    </Page>
  );
}
