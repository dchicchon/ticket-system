// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { createTheme, ThemeProvider } from '@mui/material';
import Wrapper from './components/Wrapper';
import Profile from './pages/Profile';
import TicketDetail from './pages/TicketDetail';
import Users from './pages/Users/Users';
import AuditTrail from './pages/AuditTrail';
import CreateUser from './pages/CreateUser';
import CreateTicket from './pages/CreateTicket';
import './index.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="create-ticket" element={<CreateTicket />} />
            <Route path="audit" element={<AuditTrail />} />
            <Route path="ticket/:ticketId" element={<TicketDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </>
  // /  </StrictMode>,
);
