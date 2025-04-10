import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useLayout } from './core/LayoutProvider';


const MainWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  maxHeight: '100vh', // Constrain height to viewport
  overflow: 'hidden', // Prevent outer scrolling
  backgroundColor: theme.palette.mode === 'light'
    ? '#f5f8fa'
    : theme.palette.background.default,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh', // Full height
  overflow: 'hidden', // Prevent overflow
}));

const PageWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  overflow: 'auto', // Enable scrolling
  height: 'calc(100vh - 64px)', // Account for header height
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
}));

const MasterLayout: FC = () => {
  const { config } = useLayout();

  return (
    <MainWrapper>
      <Sidebar />
      <ContentWrapper>
        <Header />
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default MasterLayout; 