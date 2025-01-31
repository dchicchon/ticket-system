import { useEffect, useState } from 'react';
// import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { TypographyVariant } from '@mui/material';

interface Props {
  sx?: object;
  date?: string;
  variant?: TypographyVariant;
  short?: boolean;
}

function DateComp(props: Props) {
  const [date, setDate] = useState('');
  useEffect(() => {
    if (props.date) {
      let formattedDate;
      if (props.short) {
        formattedDate = new Date(props.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });
      } else {
        formattedDate = new Date(props.date).toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }

      const formattedTime = new Date(props.date).toLocaleTimeString();

      setDate(`${formattedDate} ${formattedTime}`);
    }
  }, [props.date]);

  return (
    <Typography variant={props.variant || 'body1'} sx={props.sx}>
      {date}
    </Typography>
  );
}

export default DateComp;
