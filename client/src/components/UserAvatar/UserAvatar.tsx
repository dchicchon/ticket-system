import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface Props {
  sx?: object;
  user?: string;
  short?: boolean;
}

// provide name and user avatar
function UserAvatar(props: Props) {
  if (props.short) {
    return (
      <Box sx={props.sx}>
        <Tooltip title={props.user}>
          <AccountCircle />
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box sx={props.sx} display="flex" gap={1}>
      <AccountCircle />
      <Typography>{props.user}</Typography>
    </Box>
  );
}

export default UserAvatar;
