import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { TicketType, UserType } from '@/utils/interface';
import { get, put, destroy } from '@/utils/api';
import { useStore } from '@/utils/store';
import UserAvatar from '@/components/UserAvatar';
import EditableText from '@/components/EditableText';
import DateComp from '@/components/DateComp';

// TODO:
// Consider updating the select warning issue with help from SO link below
// https://stackoverflow.com/questions/76159113/material-ui-you-have-provided-an-out-of-range-value-for-the-select-component-d

export default function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const successMessage = useStore((state) => state.successMessage);

  const [ticket, setTicket] = useState<TicketType>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [assignableUsers, setAssignableUsers] = useState<Array<UserType>>([]);

  const getTicketDetail = async () => {
    // need to get the route params
    const ticketResult = await get(`/tickets/${ticketId}`);
    setTicket(ticketResult);
    setTitle(ticketResult.title);
    setDescription(ticketResult.description);
    setStatus(ticketResult.status);
    setAssignedUser(ticketResult.assignedUser || 'Unassigned');
  };

  const getAssignableUsers = async () => {
    const usersResult = await get(`/users?role=2`);
    setAssignableUsers(usersResult);
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

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    updateTicket({ status: e.target.value });
  };

  const handleAssignedUser = (e: SelectChangeEvent) => {
    setAssignedUser(e.target.value);
    updateTicket({ assignedUser: e.target.value });
  };

  useEffect(() => {
    getTicketDetail();
    getAssignableUsers();
  }, []);

  return (
    <Container sx={{ p: 2, height: '100%' }} maxWidth="xl">
      <Paper sx={{ p: 2 }}>
        <Stack gap={2} sx={{ width: '50%' }}>
          <EditableText
            sx={{ fontSize: 100 }}
            variant="standard"
            value={title}
            onSave={(text: string) => {
              updateTicket({ title: text });
            }}
          />
          <Box display="flex" gap={5}>
            <Box display="flex" gap={1}>
              <Typography variant="body1">Created:</Typography>
              <DateComp date={ticket?.createdAt} />
            </Box>
            <Box display="flex" gap={1}>
              <Typography variant="body1">Updated:</Typography>
              <DateComp date={ticket?.updatedAt} />
            </Box>
          </Box>

          <Box>
            <Box sx={{ mb: 1 }} display="flex" alignItems="center">
              <Typography variant="body1">Created by: </Typography>
              <UserAvatar sx={{ ml: 1 }} user={ticket?.createdBy} />
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1">Assigned to:</Typography>
              <Select sx={{ ml: 1 }} value={assignedUser} onChange={handleAssignedUser}>
                {assignableUsers.map((user, i) => (
                  <MenuItem value={user.username} key={i}>
                    <UserAvatar user={user?.username} />
                  </MenuItem>
                ))}
                <MenuItem value="Unassigned">
                  <UserAvatar user={'Unassigned'} />
                </MenuItem>
              </Select>
            </Box>
          </Box>

          <InputLabel>Status</InputLabel>
          <Select label="Status" value={status} onChange={handleStatusChange}>
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inprogress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          <Typography variant="h6">Description</Typography>
          <EditableText
            sx={{ p: 1, borderRadius: 1 }}
            value={description}
            onSave={(text: string) => {
              updateTicket({ description: text });
            }}
          />

          <Button variant="outlined" color="error" onClick={deleteTicket}>
            Delete Ticket
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
