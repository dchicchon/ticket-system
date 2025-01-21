import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import Page from '@/components/Page/Page';
import { useStore } from '@/utils/store';

export default function Profile() {
  const user = useStore((state) => state.user);

  return (
    <Page>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">Profile</Typography>
        <Typography variant="body1">User: {user?.username}</Typography>
        <Typography variant="body1">User Type: {user?.role}</Typography>
      </Paper>
    </Page>
  );
}
