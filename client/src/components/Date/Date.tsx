// import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

interface Props {
  sx?: object;
  date: Date;
}

function Date(props: Props) {
  return <Typography sx={props.sx}>{props.date.toDateString()}</Typography>;
}

export default Date;
