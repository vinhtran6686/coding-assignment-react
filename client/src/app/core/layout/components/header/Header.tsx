import { FC, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useAuth } from 'client/src/app/modules/auth/core/Auth';

const HeaderRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.drawer - 1,
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
}));

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  display: 'flex',
  justifyContent: 'flex-end',
}));

const UserProfileWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  marginRight: theme.spacing(1),
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const Header: FC = () => {
  const { logout, currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };
  
  const fullName = currentUser 
    ? `${currentUser.name}` 
    : 'User';

  // Generate avatar URL using currentUser avatar if available
  const avatarUrl = currentUser?.avatar || "https://placehold.co/36x36/3699FF/FFFFFF?text=U";

  return (
    <HeaderRoot>
      <HeaderToolbar>
        <UserProfileWrapper onClick={handleClick}>
          <UserAvatar src={avatarUrl} alt={fullName} />
          <UserName variant="body1">{fullName}</UserName>
        </UserProfileWrapper>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </HeaderToolbar>
    </HeaderRoot>
  );
};

export default Header; 