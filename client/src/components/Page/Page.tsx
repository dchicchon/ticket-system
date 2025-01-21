import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

export default function Page(props) {
  return (
    <Box sx={{ height: '100%' }}>
      <Container sx={{ p: 2, height: '100%' }} maxWidth="xl">
        {props.children}
      </Container>
    </Box>
  );
}
