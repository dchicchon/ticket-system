import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import Page from '@/components/Page/Page';
import { post } from '@/utils/api';
import { useStore } from '@/utils/store';
import { useNavigate } from 'react-router';

export default function CreateTicket() {
  const navigate = useNavigate();
  const successMessage = useStore((state) => state.successMessage);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createTicket = async () => {
    const result = await post('/tickets', { title, description }, { debug: true });
    if (result) {
      navigate('/');
      successMessage('Ticket created');
    }
  };

  return (
    <Page>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Create Ticket</Typography>
        <Stack maxWidth={'50%'} gap={2}>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
          />
          <TextField
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
          />
          <Button onClick={createTicket} variant="outlined">
            Create Ticket
          </Button>
        </Stack>
      </Paper>
    </Page>
  );
}
