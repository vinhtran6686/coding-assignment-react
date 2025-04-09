import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { styled } from '@mui/material/styles';

const SIDEBAR_WIDTH = 240;

const SidebarRoot = styled(Drawer)(({ theme }) => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: SIDEBAR_WIDTH,
    boxSizing: 'border-box',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: '#ffffff',
    color: theme.palette.text.primary,
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  display: 'flex',
  alignItems: 'center', 
  ...theme.mixins.toolbar,
}));

const LogoImage = styled('img')({
  height: '40px',
  width: 'auto',
});

const MenuItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const MenuItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
}));

const MenuItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: 'inherit',
  minWidth: 36,
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  },
}));

const Sidebar: FC = () => {
  const location = useLocation();
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Tickets', icon: <ConfirmationNumberIcon />, path: '/ticket' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Generate logo URL using placehold.co
  const logoUrl = "https://placehold.co/200x80/gray/white?text=Logo";

  return (
    <SidebarRoot
      variant="permanent"
      anchor="left"
    >
      <SidebarHeader>
        <LogoImage src={logoUrl} alt="My App Logo" />
      </SidebarHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
            <MenuItemButton selected={isActive(item.path)}>
              <MenuItemIcon>{item.icon}</MenuItemIcon>
              <MenuItemText primary={item.text} />
            </MenuItemButton>
          </ListItem>
        ))}
      </List>
    </SidebarRoot>
  );
};

export default Sidebar; 