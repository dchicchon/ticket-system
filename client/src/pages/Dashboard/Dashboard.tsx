import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import Ticket from '@/components/Ticket';

import { get } from '@/utils/api';
import { TicketType } from '@/utils/interface';
import Page from '@/components/Page/Page';

export default function Dashboard() {
  const [todoTickets, setTodoTickets] = useState<Array<TicketType>>([]);
  const [pendingTickets, setPendingTickets] = useState<Array<TicketType>>([]);
  const [completedTickets, setCompletedTickets] = useState<Array<TicketType>>([]);

  const getTickets = async () => {
    const data = await get('/tickets', { debug: true });
    const todo = data.list.filter((ticket: TicketType) => ticket.status === 'todo');
    const inprogress = data.list.filter(
      (ticket: TicketType) => ticket.status === 'inprogress'
    );
    const done = data.list.filter((ticket: TicketType) => ticket.status === 'completed');
    setTodoTickets(todo);
    setPendingTickets(inprogress);
    setCompletedTickets(done);
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <Page>
      <Grid sx={{ height: '75%' }} container gap={3}>
        <Grid size={3}>
          <Paper sx={{ p: 1, height: '100%' }}>
            <Typography>To Do</Typography>
            <Stack gap={2}>
              {todoTickets.map((ticket, i) => (
                <Ticket
                  key={i}
                  id={ticket.id}
                  title={ticket.title}
                  description={ticket.description}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper sx={{ p: 1, height: '100%' }}>
            <Typography>In Progress</Typography>
            <Stack gap={2}>
              {pendingTickets.map((ticket, i) => (
                <Ticket
                  key={i}
                  id={ticket.id}
                  title={ticket.title}
                  description={ticket.description}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid size={3}>
          <Paper sx={{ p: 1, height: '100%' }}>
            <Typography>Completed</Typography>
            <Stack gap={2}>
              {completedTickets.map((ticket, i) => (
                <Ticket
                  key={i}
                  id={ticket.id}
                  title={ticket.title}
                  description={ticket.description}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
}
