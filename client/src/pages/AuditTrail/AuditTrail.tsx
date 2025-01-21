import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Page from '@/components/Page/Page';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { get } from '@/utils/api';

import { EventType } from '@/utils/interface';

function EventCard(props) {
  return (
    <Paper elevation={5} sx={{ p: 2 }}>
      <Typography>User: {props.user}</Typography>
      <Typography>Event: {props.description}</Typography>
      <Typography>Date: {props.timestamp}</Typography>
    </Paper>
  );
}

export default function AuditTrail() {
  const [events, setEvents] = useState<Array<EventType>>([]);

  const getEvents = async () => {
    const results = await get('/audit', { debug: true });
    if (results.list) {
      setEvents(results.list);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <Page>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Audit Trail</Typography>
        <Stack gap={2}>
          {events.map((event, i) => (
            <EventCard
              key={i}
              user={event.user}
              timestamp={event.timestamp}
              description={event.description}
            />
          ))}
        </Stack>
      </Paper>
    </Page>
  );
}
