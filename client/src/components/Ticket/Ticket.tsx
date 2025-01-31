import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

import styles from './Ticket.module.css';

export default function Ticket(props) {
  const navigate = useNavigate();

  const ticketClick = () => {
    navigate(`ticket/${props.id}`);
  };

  return (
    <Paper
      elevation={5}
      onClick={ticketClick}
      className={styles.ticketWrapper}
      sx={{ p: 1 }}
    >
      <Typography sx={{ fontWeight: 900 }} variant="body1">
        {props.title}
      </Typography>
      <Typography variant="body1">{props.description}</Typography>
    </Paper>
  );
}
