import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Page from '@/components/Page/Page';

import { UserType } from '@/utils/interface';
import { destroy, get } from '@/utils/api';
import { useStore } from '@/utils/store';

interface UserCardProps {
  user: UserType;
}

function UserCard(props: UserCardProps) {
  const successMessage = useStore((state) => state.successMessage);

  // can only do this if you are an admin
  const deleteUser = async () => {
    const result = await destroy(`/users/${props.user.id}`);
    console.log({ result });
  };

  const canDelete = ['customer', 'employee'].includes(props.user.role);

  return (
    <Paper elevation={5} sx={{ p: 2 }}>
      <Typography>Username: {props.user.username}</Typography>
      <Typography>Role: {props.user.role}</Typography>
      <Typography>Created: {props.user.createdAt}</Typography>
      <Typography>Updated: {props.user.updatedAt}</Typography>
      {canDelete && (
        <Button onClick={deleteUser} color="error" variant="outlined">
          Delete User
        </Button>
      )}
    </Paper>
  );
}

export default function Users() {
  const [users, setUsers] = useState<Array<UserType>>([]);

  const getUsers = async () => {
    const data = await get('/users', { debug: true });
    setUsers(data);
  };

  // we should update this when our list of users changes
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Page>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Users</Typography>
        <Stack sx={{ height: '80vh' }} overflow="scroll" gap={2}>
          {users.map((user, i) => (
            <UserCard key={i} user={user} />
          ))}
        </Stack>
      </Paper>
    </Page>
  );
}
