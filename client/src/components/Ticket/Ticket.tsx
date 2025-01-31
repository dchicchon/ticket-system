import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { useNavigate } from 'react-router';

import styles from './Ticket.module.css';
import DateComp from '../DateComp';
import UserAvatar from '../UserAvatar';
import Link from '../Link';

interface TicketProps {
  id: string;
  title: string;
  updatedAt: string;
  assignedUser: string;
}

export default function Ticket(props: TicketProps) {
  // const navigate = useNavigate();

  // const ticketClick = () => {
  //   navigate(`ticket/${props.id}`);
  // };

  return (
    <Paper elevation={5} className={styles.ticketWrapper} sx={{ p: 1 }}>
      <Box display="flex" justifyContent="space-around">
        <Box>
          <Link to={`ticket/${props.id}`}>{props.title}</Link>
          {/* <Typography
            onClick={ticketClick}
            sx={{ fontWeight: 900, width: '15rem' }}
            noWrap
            variant="body1"
          >
            {props.title}
          </Typography> */}
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2">Updated - </Typography>
            <DateComp short sx={{ ml: 1 }} variant="subtitle2" date={props.updatedAt} />
          </Box>
        </Box>
        <Box display="flex">
          <UserAvatar short user={props.assignedUser} />
        </Box>
      </Box>

      {/* <Typography sx={{ fontWeight: 900 }} variant="body1">
        {props.updatedAt}
      </Typography> */}
      {/* <Typography variant="body1">{props.description}</Typography> */}
    </Paper>
  );
}
