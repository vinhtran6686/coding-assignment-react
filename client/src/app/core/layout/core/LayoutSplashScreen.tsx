import { FC } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const LoadingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.background.default,
  zIndex: 9999,
}));

const LayoutSplashScreen: FC = () => {
  return (
    <LoadingBox>
      <CircularProgress />
    </LoadingBox>
  );
};

export { LayoutSplashScreen }; 