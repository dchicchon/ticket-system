import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



interface Props {
    sx?: object;
    user?: string;
}

// provide name and user avatar
function UserAvatar(props: Props) {
  return (
    <Box sx={props.sx} display="flex" gap={1}>
      <AccountCircle />
      <Typography>{props.user}</Typography>
    </Box>
  );
}

export default UserAvatar;
