import { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useLayout } from '../../core/LayoutProvider';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from 'client/src/app/modules/auth/core/Auth';

const HeaderRoot = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  display: 'flex',
  justifyContent: 'space-between',
}));

const LogoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const ActionsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const Header: FC = () => {
  const { toggleSidebar } = useLayout();
  const {  logout} = useAuth()

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    logout()
    // Example: localStorage.removeItem('auth_token');
    // Example: window.location.href = '/auth/login';
  };

  return (
    <HeaderRoot position="fixed">
      <HeaderToolbar>
        <LogoWrapper>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My App
          </Typography>
        </LogoWrapper>
        
        <ActionsWrapper>
          <IconButton color="inherit" size="large">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            size="large"
          >
            <AccountCircle />
          </IconButton>
          <Tooltip title="Logout">
            <IconButton
              edge="end"
              aria-label="logout"
              onClick={handleLogout}
              color="inherit"
              size="large"
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </ActionsWrapper>
      </HeaderToolbar>
    </HeaderRoot>
  );
};

export default Header; 