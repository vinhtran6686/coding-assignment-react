import { toAbsoluteUrl } from 'client/src/mui-theme/helpers'
import { useEffect } from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom'

// MUI imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Link from '@mui/material/Link'

const AuthLayout = () => {
    const theme = useTheme()

    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            root.style.height = '100%'
        }
        return () => {
            if (root) {
                root.style.height = 'auto'
            }
        }
    }, [])

    return (
        <Grid container sx={{ height: '100%' }}>
            {/* Content Section */}
            <Grid item xs={12} lg={6} component={Paper} square
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* Form Container */}
                <Container maxWidth="sm" sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    flexGrow: 1,
                    py: 5 
                }}>
                    <Box sx={{ width: '100%', maxWidth: 500, p: 3 }}>
                        <Outlet />
                    </Box>
                </Container>

                {/* Footer */}
                <Box sx={{ 
                    py: 3,
                    px: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    borderTop: `1px solid ${theme.palette.divider}`
                }}>
                    <Stack direction="row" spacing={2}>
                        <Link href="#" underline="hover" color="primary">Terms</Link>
                        <Link href="#" underline="hover" color="primary">Plans</Link>
                        <Link href="#" underline="hover" color="primary">Contact Us</Link>
                    </Stack>
                </Box>
            </Grid> 
        </Grid>
    )
}

export { AuthLayout }
