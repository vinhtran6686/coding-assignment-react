import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { useLayout } from './core/LayoutProvider';

const SIDEBAR_WIDTH = 240;

const MainWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.mode === 'light'
    ? '#f5f8fa'
    : theme.palette.background.default,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  marginLeft: SIDEBAR_WIDTH,
}));

const PageWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  overflow: 'auto',
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