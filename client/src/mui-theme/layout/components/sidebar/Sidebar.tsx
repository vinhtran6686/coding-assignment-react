import { FC } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { styled } from '@mui/material/styles';

interface SidebarProps {
  open: boolean;
}

const SidebarWidth = 240;

const SidebarRoot = styled(Drawer)(({ theme }) => ({
  width: SidebarWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: SidebarWidth,
    boxSizing: 'border-box',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: theme.palette.background.paper,
  },
}));

const SidebarHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.mixins.toolbar,
}));

const Sidebar: FC<SidebarProps> = ({ open }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Tickets', icon: <ConfirmationNumberIcon />, path: '/crafted/pages/ticket' },
  ];

  return (
    <SidebarRoot
      variant="permanent"
      anchor="left"
      open={true}
    >
      <SidebarHeader>
        <img src="/logo.png" alt="Logo" height="40" />
      </SidebarHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding component={Link} to={item.path}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SidebarRoot>
  );
};

export default Sidebar; 