import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { TicketType } from '@/utils/interface';

import { get, put, destroy } from '@/utils/api';
import { useStore } from '@/utils/store';

export default function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const successMessage = useStore((state) => state.successMessage);

  const [ticket, setTicket] = useState<TicketType | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const getTicketDetail = async () => {
    // need to get the route params
    const ticketResult = await get(`/tickets/${ticketId}`);

    setTicket(ticketResult);
    setTitle(ticketResult.title);
    setDescription(ticketResult.description);
    setStatus(ticketResult.status);
  };

  const deleteTicket = async () => {
    destroy(`/tickets/${ticketId}`);
    navigate('/');
    successMessage('Ticket deleted');
  };

  const updateTicket = async (update: object) => {
    const updatedTicket = {
      ...ticket,
      ...update,
    };
    const [result] = await put(`/tickets/${ticketId}`, updatedTicket, { debug: true });
    if (result === 1) {
      successMessage('Ticket updated');
    }
  };

  const handleChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    updateTicket({ status: e.target.value });
  };

  useEffect(() => {
    console.log('retrieve ticket data');
    getTicketDetail();
  }, []);

  return (
    <Container sx={{ p: 2, height: '100%' }} maxWidth="xl">
      <Paper sx={{ p: 2 }}>
        <Stack gap={2} sx={{ width: '50%' }}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1">Created: {ticket?.createdAt.toString()}</Typography>
          <Typography variant="body1">Updated: {ticket?.updatedAt.toString()}</Typography>
          <Typography variant="body1">Created By : {ticket?.createdBy}</Typography>
          <Typography variant="body1">
            Assigned To : {ticket?.assignedUser || 'None'}
          </Typography>
          <Typography variant="body1">Description: {description}</Typography>
          <InputLabel>Status</InputLabel>
          <Select label="Status" value={status} onChange={handleChange}>
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          <Button variant="outlined" color="error" onClick={deleteTicket}>
            Delete Ticket
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
