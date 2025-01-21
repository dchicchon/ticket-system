import { useState } from 'react';
import { Link as RouterLink } from 'react-router';

import Link from '@/components/Link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useStore } from '@/utils/store';
import { get } from '@/utils/api';

const roleLevel = {
  admin: 3,
  employee: 2,
  customer: 1,
};

const links = [
  {
    role: 'admin',
    route: '/audit',
    title: 'Audit',
  },
  {
    role: 'admin',
    route: '/users',
    title: 'Users',
  },
  {
    role: 'admin',
    route: '/create-user',
    title: 'Create User',
  },
  {
    role: 'employee',
    route: '/create-ticket',
    title: 'Create Ticket',
  },
  // {
  //   role: 'employee',
  //   route: '/',
  //   title: 'Ticket System',
  // },
];

export default function Navbar() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const views = links.filter((link) => {
    return roleLevel[link.role] <= roleLevel[user.role];
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = async () => {
    await get('/auth/logout');
    setUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ m: 2, gap: 2 }}>
          <Link color="textSecondary" to="/">
            <Typography variant="h6" component="div">
              Ticket System
            </Typography>
          </Link>
          {views.map((view, i) => (
            <Link key={i} color="textSecondary" to={`${view.route}`}>
              <Typography>{view.title}</Typography>
            </Link>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <div>
          <IconButton size="large" color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link component={RouterLink} to="/profile">
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
