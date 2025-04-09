import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import { useLayout } from './core/LayoutProvider';

const MainWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

// Define interface for ContentWrapper props
interface ContentWrapperProps {
  sidebarOpen: boolean;
}

// Use shouldForwardProp to prevent the custom prop from being passed to the DOM
const ContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sidebarOpen'
})<ContentWrapperProps>(({ theme, sidebarOpen }) => ({
  display: 'flex',
  flex: '1 1 auto',
  marginLeft: sidebarOpen ? 240 : 0,
  transition: theme.transitions.create('margin-left', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const PageWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const MasterLayout: FC = () => {
  const { config } = useLayout();

  return (
    <MainWrapper>
      <Header />
      <Sidebar open={config.sidebarOpen} />
      <ContentWrapper sidebarOpen={config.sidebarOpen}>
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </ContentWrapper>
      <Footer />
    </MainWrapper>
  );
};

export default MasterLayout; 