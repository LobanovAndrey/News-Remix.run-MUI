import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  SvgIcon,
  SvgIconProps,
  Toolbar,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from '@remix-run/react';
import React from 'react';
import { NavLink } from '@remix-run/react';
import CachedIcon from '@mui/icons-material/Cached';
import HomeIcon from '@mui/icons-material/Home';

interface HeaderProps {
  title: string;
  window?: () => Window;
}

const HeaderMenuIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
    </SvgIcon>
  );
};

const DRAWER_WIDTH = 240;

export const AppHeader: React.FC<HeaderProps> = ({ title, window }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();
  const handleReload = () => {
    navigate(location.pathname);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        {title}
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <NavLink
              prefetch='intent'
              to='/'
              end
              style={{ textDecoration: 'none' }}
            >
              Home
            </NavLink>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav' color='primary'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <HeaderMenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <NavLink
              to='/'
              end
              style={{ textDecoration: 'none' }}
              prefetch='render'
              children={({ isActive }) =>
                isActive ? null : (
                  <IconButton sx={{ color: '#fff', p: 2}}>
                    <HomeIcon />
                  </IconButton>
                )
              }
            />

            <IconButton onClick={handleReload} sx={{ color: '#fff', p: 2 }}>
              <CachedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component='main'>
        <Toolbar />
      </Box>
    </Box>
  );
};
