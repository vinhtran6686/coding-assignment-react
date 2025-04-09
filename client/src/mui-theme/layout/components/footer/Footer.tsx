import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

const FooterRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  marginTop: 'auto',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Footer: FC = () => {
  return (
    <FooterRoot component="footer">
      <FooterContent maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </Typography>
        <Box>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Terms of Service
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 1 }}>
            Contact Us
          </Link>
        </Box>
      </FooterContent>
    </FooterRoot>
  );
};

export default Footer; 