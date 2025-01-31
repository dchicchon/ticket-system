import { useEffect, useState } from 'react';
// import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

interface Props {
  sx?: object;
  date?: string;
}

function DateComp(props: Props) {
  const [date, setDate] = useState('');
  useEffect(() => {
    if (props.date) {
      const formattedDate = new Date(props.date).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = new Date(props.date).toLocaleTimeString();

      setDate(`${formattedDate} ${formattedTime}`);
    }
  }, [props.date]);

  return <Typography sx={props.sx}>{date}</Typography>;
}

export default DateComp;
